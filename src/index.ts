import mongoose from 'mongoose';

import {BotConfig} from './bot/botConfig';

import {Config} from './config';

const main = async () => {
    mongoose.connect(Config.mongoUrl);
    new BotConfig();
};

main();
