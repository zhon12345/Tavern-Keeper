const dictionary = require('../../assets/json/cursive.json');

module.exports = {
	name: 'cursive',
	category: 'Fun',
	description: 'Converts text into 𝒸𝓊𝓇𝓈𝒾𝓋𝑒 𝓉𝑒𝓍𝓉.',
	aliases: [],
	usage: 'cursive <message>',
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

		if(text.length > 1024) {
			return message.channel.send(
				'`❌` You have exceeded the 1024 characters limit.',
			);
		}

		const cursive = text.toLowerCase().split('').map(letter => {
			return dictionary[letter] || letter;
		}).join('');

		message.channel.send(cursive);
	},
};