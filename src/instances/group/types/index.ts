import { Aggregate, Document, Model } from "mongoose";

export interface IGroup {
  telegramId: string;
}

export interface IGroupObject extends IGroup {
  _id: Document["_id"];

  createdAt: Date;
  updatedAt: Date;
}

export interface IDocument extends IGroupObject, Document {
  _id: Document["_id"];
}

export interface IModel extends Model<IGroupObject, IDocument> {
    findGroupWithMinimumUsers(): Promise<IGroupObject | null>;
    createIfNotExists(groupId: string): Promise<IGroupObject>;
  }