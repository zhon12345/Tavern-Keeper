/* eslint-disable no-shadow */
const moment = require('moment');

module.exports = {
	name: 'report',
	category: 'Misc',
	description: 'Report an issue within the bot to the developers.',
	aliases: [],
	usage: 'report <issue>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			);
		}
		const channel = client.channels.cache.get('720955196494053376');
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` ⚠️ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id}) has reported an issue in **${message.guild.name}** (ID: ${message.guild.id}). \n\`[Issue]\` ${text}`,
		);
		await message.channel.send(
			'<:vSuccess:725270799098970112> Successfully reported the issue.',
		).then(message.delete());
	},
};