/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import {
    Message,
    Update,
    User,
} from 'typegram';
//библиотека телеграма недоработана, поэтому косяки вылезают при типизации,
//поэтому я свой тип сделал на базе этого
export type BaseMessage = Update.New &
Update.NonChannel &
Message & {
    text?: string;
    forward_from?: User;
    voice?: unknown;
    sticker?: unknown;
    document?: unknown;
    photo?: unknown[];
    caption: string;
};

export type TgMessage = BaseMessage & {
    reply_to_message?: BaseMessage;
};
