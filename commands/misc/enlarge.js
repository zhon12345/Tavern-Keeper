const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
	name: "enlarge",
	category: "Misc",
	description: "Enlarge a specified emoji.",
	aliases: [],
	usage: "enlarge <emoji>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const emoji = args[0];
		if (!emoji) {
			return message.channel.send("`❌` Emoji not found, please provide a valid emoji.");
		}

		const custom = Discord.Util.parseEmoji(emoji);

		if (custom.id) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`Enlarged version of: ${emoji}`)
				.setColor("BLUE")
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
			return message.channel.send(embed);
		} else {
			const parsed = parse(emoji, { assetType: "png" });
			if (!parsed[0]) {
				return message.channel.send("`❌` Emoji not found, please provide a valid emoji. (eg. `😳`)");
			}
			const embed = new Discord.MessageEmbed()
				.setTitle(`Enlarged version of ${emoji}`)
				.setColor("BLUE")
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.setImage(parsed[0].url);
			return message.channel.send(embed);
		}
	},
};
