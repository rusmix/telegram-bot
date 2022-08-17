import {IMongoose as IGroup} from '../group/types';
import {
    IDocument,
    IModel,
    IMongoose as IUser,
    IObject as IUserObject,
} from './types';

import {ObjectId} from 'mongodb';
import {
    model,
    Schema,
} from 'mongoose';

import {GROUPS_COLLECTION_NAME} from '../group/constants';
import {Groups} from '../group/model';

import {USERS_COLLECTION_NAME} from './constants';

const {Types} = Schema;

const UserSchema = new Schema<IDocument, IModel>(
    {
        telegramId: {
            type: Types.String,
            required: true,
        },
        username: {
            type: Types.String,
        },
        firstName: {
            type: Types.String,
        },
        lastName: {
            type: Types.String,
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

UserSchema.pre<IUserObject>('save', function() {
    this.updatedAt = new Date();
});

UserSchema.statics.createIfNotExists = async function(
    user: IUser,
    groupId: ObjectId
): Promise<IUserObject | undefined> {
    const existingUser = await Users.findOne({
        telegramId: user.telegramId,
    });

    if (existingUser) return existingUser;

    const group = await Groups.findOne({_id: groupId});

    if (!group) return;

    return new Users({
        telegramId: user.telegramId,
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        group,
    }).save();
};

UserSchema.statics.getTelegramGroupId = async function(
    telegramId: string
): Promise<string> {
    const [res] = await this.aggregate()
        .match({telegramId})
        .lookup({
            from: GROUPS_COLLECTION_NAME,
            localField: 'group',
            foreignField: '_id',
            as: 'groupObject',
        })
        .unwind({
            path: '$groupObject',
            preserveNullAndEmptyArrays: true,
        })
        .exec();

    console.log(res);

    return res.groupObject.telegramId;
};

export const Users = model<IDocument, IModel>(
    USERS_COLLECTION_NAME,
    UserSchema,
    USERS_COLLECTION_NAME
);
