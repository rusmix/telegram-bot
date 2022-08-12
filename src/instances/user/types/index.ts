import { ObjectId } from "mongodb";
import { Aggregate, Document, Model } from "mongoose";
import { IGroup } from "../../group/types/index"

export interface IUser {
  telegramId: string;
  username: string;
  group: ObjectId | IGroup;
}

export interface IUserObject extends IUser {
  _id: Document["_id"];

  createdAt: Date;
  updatedAt: Date;
}

export interface IDocument extends IUserObject, Document {
    _id: Document["_id"];
}

export interface IModel extends Model<IUserObject, IDocument> {
    createIfNotExists(user: IUser, groupId: IGroup): Promise<IUserObject>;
    getGroupId(telegramId: string): Promise<string>;
}


