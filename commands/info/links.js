/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "links",
	category: "Info",
	description: "Returns the bot's links.",
	aliases: ["link", "invite"],
	usage: "links",
	run: async (client, message, args) => {
		const pEmbed = new MessageEmbed()
			.setTitle(`${client.user.username}'s Links`)
			.setDescription(`Here are all the related links to ${client.user.username}!`)
			.setColor("BLUE")
			.addFields(
				{ name: "Invite link", value: "[Invite](https://discord.com/oauth2/authorize?client_id=722054700308103200&scope=bot&permissions=1007807606)", inline: true },
				{ name: "Website", value: "[Website](https://tavernkeeper.ml/)", inline: true },
				{ name: "Official Discord Server", value: "[Discord Server](https://discord.gg/jMpw3jw)", inline: true },
				{ name: "Discord Boats", value: "[Vote](https://discord.boats/bot/722054700308103200)", inline:true },
				{ name: "Astro Bot List", value: "[Vote](https://botlists.com/bot/722054700308103200)", inline:true },
				{ name: "DBots", value: "[Vote](https://dbots.co/bots/722054700308103200)", inline:true },
			);
		message.channel.send(pEmbed);
	},
};