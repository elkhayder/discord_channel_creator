"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceStateUpdateHandler = void 0;
const constants_1 = require("./constants");
const createdChannels = [];
const voiceStateUpdateHandler = (oldState, newState) => __awaiter(void 0, void 0, void 0, function* () {
    if (!newState.member ||
        !oldState.member ||
        newState.member.user.bot ||
        !newState.channel)
        return;
    // Handle Deleting Channel if no used is there anymore
    if (oldState.channel && createdChannels.includes(oldState.channel.id)) {
        if (oldState.channel.members.size === 0)
            oldState.channel.delete();
        //  return;
    }
    if (newState.channelId !== constants_1.CHANNEL_ID)
        return;
    const newChannel = yield newState.guild.channels.create(newState.member.displayName, { type: "GUILD_VOICE", parent: constants_1.PARENT_ID });
    createdChannels.push(newChannel.id);
    newState.member.voice.setChannel(newChannel);
});
exports.voiceStateUpdateHandler = voiceStateUpdateHandler;
