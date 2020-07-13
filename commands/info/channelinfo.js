const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const { parseDur } = require('../../functions');

const option = {
	true: 'Yes',
	false: 'No',
};

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
	description: 'Displays information about a provided role.',
	aliases: ['channel'],
	usage: 'channelinfo [channel]',
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if(!channel) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid channel',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		let topic;
		if(!channel.topic || channel.topic === null) {
			topic = 'None';
		}
		else {
			topic = channel.topic;
		}

		let parent;
		if(!channel.parent || channel.parent === null) {
			parent = 'None';
		}
		else {
			parent = channel.parent;
		}

		const embed = new MessageEmbed()
			.setDescription(`**Role information for ${channel.name}**`)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setColor('BLUE')
			.addField('General', [
				`**❯ Name:** ${channel.name}`,
				`**❯ ID:** ${channel.id}`,
				`**❯ Created on:** ${moment(channel.createdTimestamp).format('Do MMMM YYYY HH:mm')}`,
				'\u200b',
			])
			.addField('Server', [
				`**❯ NSFW:** ${option[channel.nsfw]}`,
				`**❯ Type:** ${types[channel.type]}`,
				`**❯ Slowmode:** ${parseDur(channel.rateLimitPerUser)}`,
				`**❯ Parent:** ${parent}`,
				'\u200b',
			])

			.addField('Topic', [
				`${topic}`,
			]);

		return message.channel.send(embed);
	},
};