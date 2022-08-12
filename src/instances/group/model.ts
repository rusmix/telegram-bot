import { IDocument, IGroupObject, IModel } from "./types";

import { Aggregate, model, Schema } from "mongoose";
import { USERS_COLLECTION_NAME } from "../user/constants";

import { GROUPS_COLLECTION_NAME } from "./constants";

const { Types } = Schema;

const GroupSchema = new Schema<IDocument, IModel>(
  {
    telegramId: {
      type: Types.String,
      required: true,
    },
    createdAt: {
      type: Types.Date,
      default: Date.now,
    },
    updatedAt: {
      type: Types.Date,
      default: Date.now,
    },
  },
  {
    minimize: false,
  }
);

GroupSchema.pre<IDocument>("save", function () {
  this.updatedAt = new Date();
});

GroupSchema.statics.findGroupWithMinimumUsers =
  async function (): Promise<IGroupObject | null> {
    const [res] = await this.aggregate()
      .lookup({
        from: USERS_COLLECTION_NAME,
        localField: "_id",
        foreignField: "group",
        as: "users",
      })
      .addFields({
        usersTotal: { $size: "$users" },
      })
      .addFields({
        users: null,
      })
      .sort({
        usersTotal: 1,
      })
      .limit(1)
      .exec();
    return res;
  };

GroupSchema.statics.createIfNotExists = async function (
  groupId: string
): Promise<IGroupObject> {
  const existingGroup = await Groups.findOne({
    telegramId: groupId,
  });
  if (existingGroup) return;
  return await new Groups({ telegramId: groupId }).save();
};

export const Groups = model<IDocument, IModel>(
  GROUPS_COLLECTION_NAME,
  GroupSchema,
  GROUPS_COLLECTION_NAME
);
