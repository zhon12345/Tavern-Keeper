const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");

module.exports = {
	name: "guilds",
	category: "Owner",
	description: "Shows a list of servers that the bot is in.",
	aliases: ["servers"],
	usage: "guilds",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message) => {
		const list = client.guilds.cache
			.sort((a, b) => a.joinedAt - b.joinedAt)
			.map((guild) => `${guild.name} (${guild.id})`)
			.join("\n");

		let response;
		try {
			response = await sourcebin.create(
				[
					{
						name: " ",
						content: list,
						languageId: "text",
					},
				],
				{
					title: `${client.user.username}'s server list`,
					description: " ",
				},
			);
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		const botembed = new MessageEmbed()
			.setColor("BLUE")
			.setDescription(
				list.length > 1024
					? `**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.\n The server list exceeds the character limit, click [here](${response.url}) for the full list`
					: `**${client.user.username}** is currently in **${message.client.guilds.cache.size}** servers.`,
			)
			.addField("Servers", list.length > 1024 ? `${list.slice(0, 1021)}...` : list);
		message.channel.send(botembed);
	},
};
