const { leetify } = require('../../functions');

module.exports = {
	name: 'leetify',
	category: 'Fun',
	description: 'B3C0M3 4N l337 h4X0R.',
	aliases: ['leet', '1337'],
	usage: 'leetify <text>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'`❌` Please provide valid text.',
			);
		}
		if(text.length > 2000) {
			return message.channel.send('`❌` The provided message exceeds 2000 characters.');
		}

		message.channel.send(leetify(text));
	},
};