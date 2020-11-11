const Discord = require('discord.js');
const { parse } = require('twemoji-parser');

module.exports = {
	name: 'enlarge',
	category: 'Misc',
	description: 'Enlarge a specified emoji.',
	aliases: [],
	usage: 'enlarge <emoji>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const emoji = args[0];
		if (!emoji) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid emoji.',
			);
		}

		const custom = Discord.Util.parseEmoji(emoji);

		if (custom.id) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`Enlarged version of: ${emoji}`)
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? 'gif' : 'png'}`);
			return message.channel.send(embed);
		}
		else {
			const parsed = parse(emoji, { assetType: 'png' });
			if (!parsed[0]) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid emoji.',
				);
			}
			const embed = new Discord.MessageEmbed()
				.setTitle(`Enlarged version of ${emoji}`)
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.setImage(parsed[0].url);
			return message.channel.send(embed);
		}
	},
};