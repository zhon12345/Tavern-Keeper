/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "links",
	category: "Info",
	description: "Returns the bot's links.",
	aliases: ["link", "invite"],
	usage: "links",
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const pEmbed = new MessageEmbed()
			.setTitle(`${client.user.username}'s Links`)
			.setDescription(`Here are all the related links to ${client.user.username}!`)
			.setColor("BLUE")
			.addFields(
				{ name: "Invite link", value: "[Bot Invite](https://discord.com/oauth2/authorize?client_id=722054700308103200&scope=bot&permissions=490056959)", inline: true },
				{ name: "Website", value: "[Bot Website](http://tavernkeeper.ml/)", inline: true },
				{ name: "Official Discord Server", value: "[Discord Server](https://discord.gg/jMpw3jw)", inline: true },
				{ name: "Discord Boats", value: "[Vote](https://discord.boats/bot/722054700308103200)", inline:true },
				{ name: "Discord Bots", value: "[Vote](https://discord.bots.gg/bots/722054700308103200)", inline:true },
				{ name: "Top.gg", value: "[Vote](https://top.gg/bot/722054700308103200)", inline:true },
			);
		message.channel.send(pEmbed);
	},
};