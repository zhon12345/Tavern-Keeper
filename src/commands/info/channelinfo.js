const { parseDur } = require('../../functions');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const types = {
	dm: 'DM',
	text: 'Text',
	voice: 'Voice',
	category: 'Category',
	news: 'News',
	store: 'Store',
	unknown: 'Unknown',
};

module.exports = {
	name: 'channelinfo',
	category: 'Info',
	description: 'Displays information about a provided channel.',
	aliases: ['channel', 'ci'],
	usage: 'channelinfo [channel]',
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if(!channel) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid channel',
			);
		}

		let topic;
		if(!channel.topic) {
			topic = 'None';
		}
		else {
			topic = channel.topic;
		}

		const embed = new MessageEmbed()
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle('Channel Information')
			.addFields(
				{ name: 'Channel Name', value: `\`\`\`${channel.name}\`\`\``, inline:true },
				{ name: 'Channel ID', value: `\`\`\`${channel.id}\`\`\``, inline:true },
				{ name: 'Channel Topic', value: `\`\`\`${topic}\`\`\`` },
				{ name: 'Channel Type', value: `\`\`\`${types[channel.type]}\`\`\``, inline:true },
				{ name: 'Slowmode', value: `\`\`\`${parseDur(channel.rateLimitPerUser * 1000)}\`\`\``, inline:true },
				{ name: 'NSFW', value: `\`\`\`${channel.nsfw ? 'Yes' : 'No'}\`\`\``, inline:true },
				{ name: 'Created', value: `\`\`\`${moment(channel.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - channel.createdTimestamp) / 86400000)} day(s) ago\`\`\`` },
			);

		return message.channel.send(embed);
	},
};