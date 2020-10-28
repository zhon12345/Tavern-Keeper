require("dotenv").config();
const keepAlive = require("./server");
const { abl } = require("abl-wrapper");
const { ASTROBOTLIST_TOKEN } = process.env;
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ disableMentions: "everyone", ws: { intents: Intents.ALL } });

client.commands = new Collection();
client.aliases = new Collection();
client.category = new Collection();
client.snipes = new Map();

["command", "event"].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

setInterval(() => {
	abl.count(ASTROBOTLIST_TOKEN, client, (error, success) => {
		if(error) throw new Error(error);
		else console.log(success);
	});
}, 8.64e+7);


keepAlive();
client.login(process.env.BOT_TOKEN);
