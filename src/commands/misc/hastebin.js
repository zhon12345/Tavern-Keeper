const { sourcebin } = require('../../functions');

module.exports = {
	name: 'hastebin',
	category: 'Misc',
	description: 'Upload specified text to sourcebin.',
	aliases: ['pastebin', 'bin'],
	usage: 'hastebin <text>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'`❌` Please provide valid text',
			);
		}

		message.channel.send(await sourcebin(`${message.author.tag}'s sourcebin`, '', '', text));
	},
};