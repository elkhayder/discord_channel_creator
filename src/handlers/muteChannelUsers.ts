import Discord from "discord.js";
import { COMMANDS_CHANNEL } from "../constants";

const muteChannelUsers = async (message: Discord.Message) => {
   if (message.content.toLowerCase() !== "!mute") return;

   if (message.channelId !== COMMANDS_CHANNEL) return;
   const channel = message.member?.voice.channel;
   if (!channel) return;
   channel.members.forEach((member) => member.edit({ mute: true }));
};

export default muteChannelUsers;
