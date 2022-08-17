import {TgMessage} from './types/index';
import {StringLiteral} from 'typescript';

import {
    Context,
    Telegraf,
} from 'telegraf';

import {Config} from '../config';
import {Groups} from '../instances/group/model';
import {Users} from '../instances/user/model';

export class BotStrategies {
    constructor(private readonly bot: Telegraf<Context>) {}

    Initialize() {
        this.bot.start((ctx: Context) => this.start(ctx));

        this.bot.hears(/\/set_this_group_as_support/, (ctx: Context) =>
            this.setThisGroupAsSupport(ctx)
        );

        this.bot.on('message', (ctx: Context) => this.handleMessage(ctx));

        // this.clearBD();

        console.log('BotStrategies initialization ended.');
    }

    private async clearBD() {
        await Users.remove();
        await Groups.remove();
    }

    private async start(ctx: Context) {
        try {
            // console.log(ctx.message);
            const message = ctx.message as TgMessage;

            if (message.chat.id < 0) return;

            const group = await Groups.findGroupWithMinimumUsers();

            console.log(group);
            if (!group)
                ctx.reply('Can\'t find avalible support group, send /start later.');
            else {
                const user = await Users.createIfNotExists(
                    {
                        telegramId: message.from.id as unknown as string,
                        username: message.from?.username,
                        group: undefined,
                        firstName: message.from?.first_name,
                        lastName: message.from?.last_name,
                    },
                    group._id
                );

                console.log(user);
                ctx.reply(
                    'Добро пожаловать! Если у Вас есть вопросы или предложения, напишите их в чат!'
                );
            }

            return;
        } catch (e) {
            console.log(e);
            ctx.reply('Unknown error accured: ', e.message);
        }
    }

    private async getUserIdFromReply(ctx: Context): Promise<string> {
        const message = ctx.message as TgMessage;

        try {
            if ('forward_sender_name' in message.reply_to_message) {
                const firstName =
          message.reply_to_message.forward_sender_name.split(' ')[0];

                const lastName =
          message.reply_to_message.forward_sender_name.split(' ')[1];
                const user = await Users.findOne({
                    firstName,
                    lastName,
                });

                return user.telegramId;
            } else return String(message.reply_to_message.forward_from?.id);
        } catch (e) {
            console.log(e);
        }
    }

    private async setThisGroupAsSupport(ctx: Context) {
        const message = ctx.message as TgMessage;

        try {
            if (message?.text.split(' ')[1] !== Config.botSecret) return;

            const newGroup = await Groups.createIfNotExists(
                String(ctx.message.chat.id)
            );

            if (!newGroup)
                return ctx.reply('Эта группа уже является группой поддержки');

            return ctx.reply('Эта группа успешно установлена как группа поддержки');
        } catch (e) {
            console.log(e);
            ctx.reply('Unknown error accured. ');
        }
    }

    private async handleMessage(ctx: Context) {
        try {
            //console.log(ctx.message);
            const group = await Groups.findOne({
                telegramId: String((ctx.message as TgMessage).chat.id),
            });

            if (group) return this.handleMessageFromSupport(ctx);

            return this.handleMessageFromUser(ctx);
        } catch (e) {
            console.log(e);
            ctx.reply('Unknown error accured: ', e.message);
        }
    }

    private async errorHandler(e, chatId) {
        try {
            console.log(e);
            if (e.response.error_code == 403) {
                await this.bot.telegram.sendMessage(
                    chatId,
                    'Сообщение не доставлено, пользователь заблокировал бота.'
                );
            } else
                await this.bot.telegram.sendMessage(
                    chatId,
                    'Сообщение не доставлено, что-то пошло не так.'
                );
        } catch (e) {
            console.log(e);
        }
    }

    private async handleMessageFromSupport(ctx: Context) {
        const message = ctx.message as TgMessage;

        if (!message.reply_to_message) return;
        if (message.reply_to_message.from.id !== this.bot.botInfo.id) return;

        console.log('from support ____', message);

        try {
            const userId = await this.getUserIdFromReply(ctx);

            await this.bot.telegram.copyMessage(
                userId,
                message.chat.id,
                message.message_id
            );
        } catch (e) {
            this.errorHandler(e, message.chat.id);
        }
    }

    private async handleMessageFromUser(ctx: Context) {
        try {
            console.log('enter');

            const userId = String((ctx.message as TgMessage).from.id);

            console.log(userId);
            console.log(await Users.find());

            const userGroupId = await Users.getTelegramGroupId(userId);

            console.log(userGroupId);
            if (userGroupId == undefined)
                return ctx.reply('Возникла какая-то проблема');

            return ctx.forwardMessage(userGroupId);
        } catch (e) {
            console.log(e);
        }
    }
}
