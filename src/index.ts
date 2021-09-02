import Discord, { Intents } from "discord.js";
import { voiceStateUpdateHandler } from "./handlers";
import muteChannelUsers from "./handlers/muteChannelUsers";
import unmuteChannelUsers from "./handlers/unmuteChannelUser";
require("dotenv").config();

const client = new Discord.Client({
   intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
   ],
});

client.once("ready", () => {
   console.log("Ready");
});

client.on("message", (message) => {
   muteChannelUsers(message);
   unmuteChannelUsers(message);
});

client.on("voiceStateUpdate", voiceStateUpdateHandler);

client.on("error", console.warn);

client.login(process.env.TOKEN);
