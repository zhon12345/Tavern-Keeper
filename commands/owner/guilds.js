/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const url = "https://hasteb.in/documents";
const fetch = require("node-fetch");

module.exports = {
	name: "guilds",
	category: "Owner",
	description: "Shows a list of servers that the bot is in.",
	aliases: ["servers"],
	usage: "guilds",
	userperms: ["BOT_OWNER"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const list = client.guilds.cache.sort((a, b) => a.joinedAt - b.joinedAt).map(guild => `${guild.name} (${guild.id})`).join("\n");

		let response;
		try {
			response = await fetch(url, {
				method: "POST",
				body: list,
				headers: {
					"Content-Type": "text/plain",
				},
			}).then(res => res.json());
		}
		catch (e) {
			return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
		}

		const botembed = new MessageEmbed()
			.setColor("BLUE")
			.setDescription(list.length > 1024 ?
				[`
				**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.
				The server list exceeds the character limit, click [here](https://hasteb.in/${response.key}) for the full list
				`] : `**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.`)
			.addField("Servers", list.length > 1024 ? `${list.slice(0, 1021)}...` : list);
		message.channel.send(botembed);
	},
};