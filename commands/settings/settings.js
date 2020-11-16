/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");

module.exports = {
	name: "settings",
	category: "Settings",
	description: "Displays the server's settings.",
	aliases: ["setting"],
	usage: "settings",
	userperms: ["ADMINISTRATOR"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args, prefix) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const embed = new MessageEmbed()
			.setTitle(`${client.user.username}'s Settings`)
			.setColor("BLUE")
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addField("<:documents:773950876347793449> Settings ❯", [
				`> **Prefix: \`${settings ? settings.prefix : prefix}\`**`,
				"> **Anti Profanity: `Coming Soon...`**",
				`> **Anti Links: \`${settings ? settings.settings.antilinks ? "On" : "Off" : "Off"}\`**`,
				"> **Muted Role:** Coming Soon...",
				"> **Member Role:** Coming Soon...",
				`> **Mod Log: ${settings ? settings.settings.modlog ? message.guild.channels.cache.get(settings.settings.modlog) : "`None`" : "`None`"}**`,
				`> **Server Log: ${settings ? settings.settings.serverlog ? message.guild.channels.cache.get(settings.settings.serverlog) : "`None`" : "`None`"}**`,
				`> **Message Log: ${settings ? settings.settings.messagelog ? message.guild.channels.cache.get(settings.settings.messagelog) : "`None`" : "`None`"}**`,
			]);
		return message.channel.send(embed);
	},
};