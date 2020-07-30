/* eslint-disable no-shadow */
const moment = require('moment');

module.exports = {
	name: 'report',
	category: 'Misc',
	description: 'Report an issue within the bot to the developers.',
	aliases: [],
	usage: 'report <issue>',
	guildOnly: true,
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		const channel = client.channels.cache.get('724508956981985351');
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` ⚠️ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id}) has reported an issue \n\`[Issue]\` ${text}`,
		);
		await message.channel.send(
			'<:vSuccess:725270799098970112> Successfully reported the issue.',
		).then(message.delete());
	},
};