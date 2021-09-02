import Discord from "discord.js";
import { COMMANDS_CHANNEL } from "../constants";

const unmuteChannelUsers = async (message: Discord.Message) => {
   if (message.content.toLowerCase() !== "!unmute") return;

   if (message.channelId !== COMMANDS_CHANNEL) return;
   const channel = message.member?.voice.channel;
   if (!channel) return;
   channel.members.forEach((member) => member.edit({ mute: false }));
};

export default unmuteChannelUsers;
