/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const url = "https://hasteb.in/documents";
const fetch = require("node-fetch");
const { BOT_OWNER } = process.env;

module.exports = {
	name: "guilds",
	category: "Owner",
	description: "Shows a list of servers that the bot is in.",
	aliases: ["servers"],
	usage: "guilds",
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return;
		}
		const botembed = new MessageEmbed()
			.setColor("BLUE");

		const list = client.guilds.cache.sort((a, b) => a.joinedAt - b.joinedAt).map(guild => `${guild.name} (${guild.id})`).join("\n");
		if (list.length >= 1024) {
			let response;
			try {
				response = await fetch(url, { method: "POST", body: list, headers: { "Content-Type": "text/plain" } }).then(res => res.json());

				botembed.setDescription([`
				**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.
				The server list exceeds the character limit, click [here](https://hasteb.in/${response.key}) for the full list
				`]);
				botembed.addField("Servers", `${list.slice(0, 1021)}...`);
			}
			catch (e) {
				return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
			}
		}
		else{
			botembed.setDescription(`**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.`);
			botembed.addField("Servers", list);
		}

		message.channel.send(botembed);
	},
};