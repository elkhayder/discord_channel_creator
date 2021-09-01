import Discord from "discord.js";
import { CHANNEL_ID, PARENT_ID } from "./constants";

const createdChannels: string[] = [];

export const voiceStateUpdateHandler = async (
   oldState: Discord.VoiceState,
   newState: Discord.VoiceState
) => {
   if (
      !newState.member ||
      !oldState.member ||
      newState.member.user.bot ||
      !newState.channel
   )
      return;

   // Handle Deleting Channel if no used is there anymore
   if (oldState.channel && createdChannels.includes(oldState.channel.id)) {
      if (oldState.channel.members.size === 0) oldState.channel.delete();
      //  return;
   }

   if (newState.channelId !== CHANNEL_ID && oldState.channelId !== CHANNEL_ID)
      return;

   const newChannel = await newState.guild.channels.create(
      newState.member.displayName,
      { type: "GUILD_VOICE", parent: PARENT_ID }
   );

   createdChannels.push(newChannel.id);

   newState.member.voice.setChannel(newChannel);
};
