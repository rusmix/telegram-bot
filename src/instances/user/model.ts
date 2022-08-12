import { Aggregate, model, Schema } from "mongoose";
import { IModel, IDocument, IUserObject } from "./types";
import { USERS_COLLECTION_NAME } from "./constants";
import { GROUPS_COLLECTION_NAME } from "../group/constants";
import { IGroupObject } from "../group/types";
import { Groups } from "../group/model";

const { Types } = Schema;

const UserSchema = new Schema<IDocument, IModel>(
  {
    telegramId: {
      type: Types.String,
      required: true,
    },
    username: {
      type: Types.String,
      required: true,
    },
    group: {
      type: Types.ObjectId,
      ref: GROUPS_COLLECTION_NAME,
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

UserSchema.pre<IUserObject>("save", function () {
  this.updatedAt = new Date();
});

UserSchema.statics.createIfNotExists = async function (
  user: IUserObject,
  groupId: IGroupObject
): Promise<IUserObject> {
  const existingUser = await Users.findOne({
    telegramId: user.telegramId,
  });
  if (existingUser) return existingUser;
  const group = await Groups.findOne({ _id: groupId });
  if (!group) return;
  return new Users({
    telegramId: user.telegramId,
    username: user.username,
    group: group,
  }).save();
};

UserSchema.statics.getGroupId = async function (
  telegramId: string
): Promise<string> {
  const [res] = await this.aggregate()
    .lookup({
      from: GROUPS_COLLECTION_NAME,
      localField: "group",
      foreignField: "_id",
      as: "groupObject",
    })
    .unwind({
      path: "$groupObject",
      preserveNullAndEmptyArrays: true,
    })
    .exec();

  return res.groupObject.telegramId;
};

export const Users = model<IDocument, IModel>(
  USERS_COLLECTION_NAME,
  UserSchema,
  USERS_COLLECTION_NAME
);
