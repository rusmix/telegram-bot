import {ObjectId} from 'mongodb';
import {
    Document,
    Model,
} from 'mongoose';

export interface IMongoose {
    telegramId: string;
    username: string;
    firstName: string;
    lastName: string;
    group: ObjectId;
}

export interface IObject extends IMongoose {
    _id: Document['_id'];

    createdAt: Date;
    updatedAt: Date;
}

export interface IDocument extends IObject, Document {
    _id: Document['_id'];
}

export interface IModel extends Model<IDocument> {
    createIfNotExists(user: IMongoose, groupId: ObjectId): Promise<IObject | null>;
    getTelegramGroupId(telegramId: string): Promise<string>;
}
