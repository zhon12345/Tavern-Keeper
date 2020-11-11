/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const { BOT_OWNER } = process.env;

module.exports = {
	name: "about",
	category: "Info",
	description: "Returns the bot's about page.",
	aliases: [],
	usage: "about",
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setDescription([
				`Hello! I'm **${client.user.username}**, A featureful multi-purpouse Discord bot!`,
				`Created and maintained by \`${client.users.cache.get(BOT_OWNER).tag}\`.`,
				"Built using [Node.js](https://nodejs.org/en/) and [Discord.js](https://discord.js.org/#/)",
			])
			.addFields(
				{
					name: "Need some help?",
					value: "Join our [Discord Server](https://discord.gg/jMpw3jw)",
				},
			)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp()
			.setColor("BLUE");
		message.channel.send(embed);
	},
};