import Discord, { Intents } from "discord.js";
import { CHANNEL_ID, PARENT_ID } from "./constants";
import { voiceStateUpdateHandler } from "./handlers";
require("dotenv").config();

const client = new Discord.Client({
   intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

const createdChannels: Discord.VoiceChannel[] = [];

client.once("ready", () => {
   console.log("Ready");
});

client.on("voiceStateUpdate", voiceStateUpdateHandler);

client.on("error", console.warn);

client.login(process.env.TOKEN);
