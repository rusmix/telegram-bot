import { Telegraf, Context } from "telegraf";
import "dotenv/config";
import { Users } from "../instances/user/model";
import { Groups } from "../instances/group/model";

export class BotStrategies {
  constructor(private readonly bot: Telegraf<Context>) {}

  Initialize() {
    this.bot.start((ctx: Context) => this.start(ctx));

    this.bot.hears(/set_this_group_as_support/, (ctx: Context) =>
      this.setThisGroupAsSupport(ctx)
    );

    this.bot.on("message", (ctx: Context) => this.handleMessage(ctx));

    console.log("BotStrategies initialization ended.");
  }

  private async start(ctx: Context) {
    try {
      if (ctx.message.chat.id < 0) return;
      const group = await Groups.findGroupWithMinimumUsers();
      if (!group) ctx.reply("Can't find avalible support group");
      else {
        await Users.createIfNotExists(
          {
            telegramId: ctx.message.from.id as unknown as string,
            username: ctx.message.from.username,
            group: undefined,
          },
          group
        );
      }
      return;
    } catch (e) {
      console.log(e);
      ctx.reply("Unknown error accured: ", e.message);
    }
  }

  private async setThisGroupAsSupport(ctx: Context) {
    try {
      if ((ctx as any).message?.text.split(" ")[1] !== process.env.BOT_SECRET)
        return;
      const newGroup = await Groups.createIfNotExists(
        String(ctx.message.chat.id)
      );
      if (!newGroup)
        throw new Error("Эта группа уже является группой поддержки");
      return "Эта группа успешно установлена как группа поддержки";
    } catch (e) {
      console.log(e);
      ctx.reply("Unknown error accured: ", e.message);
    }
  }

  private async handleMessage(ctx: Context) {
    try {
      // console.log(ctx.message);
      const group = await Groups.findOne({
        telegramId: String(ctx.message.chat.id),
      });
      if (group) return this.handleMessageFromSupport(ctx);
      return this.handleMessageFromUser(ctx);
    } catch (e) {
      console.log(e);
      ctx.reply("Unknown error accured: ", e.message);
    }
  }

  private async handleMessageFromSupport(ctx: Context) {
    const message = ctx.message as any;
    if (!message.reply_to_message) return;
    if (message.reply_to_message.from.id !== this.bot.botInfo.id) return;

    const userId = String(
      (ctx.message as any).reply_to_message.forward_from?.id
    );

    const [text, file_id] = [
      message.text || message.caption,
      (
        ((message.photo ? message.photo.slice(-1)[0] : false) ||
          message.document ||
          message.sticker ||
          message.voice) as any
      )?.file_id,
    ];
    if (text) await this.bot.telegram.sendMessage(userId, text);
    if (file_id) {
      try {
        await this.bot.telegram.sendPhoto(userId, file_id);
      } catch {
        await this.bot.telegram.sendDocument(userId, file_id);
      }
    }
  }

  private async handleMessageFromUser(ctx: Context) {
    const user_group_id = await Users.getGroupId(
      ctx.message.from.id as unknown as string
    );
    return ctx.forwardMessage(user_group_id);
  }
}
