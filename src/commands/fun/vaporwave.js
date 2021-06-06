const dictionary = require('../../assets/json/vaporwave.json');

module.exports = {
	name: 'vaporwave',
	aliases: ['aesthetic'],
	description: 'Converts text into ｖａｐｏｒｗａｖｅ.',
	usage: 'vapourwave <text>',
	category: 'Fun',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!args[0]) {
			return message.channel.send(
				'`❌` Please provide valid text.',
			);
		}

		if(text.length > 1024) {
			return message.channel.send(
				'`❌` You have exceeded the 1024 characters limit.',
			);
		}

		const vaporwave = text.split('').map(letter => {
			return dictionary[letter] || letter;
		}).join('');

		message.channel.send(vaporwave);
	},
};