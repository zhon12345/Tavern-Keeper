const dictionary = require('../../assets/json/cursive.json');

module.exports = {
	name: 'cursive',
	category: 'Fun',
	description: 'Converts text into 𝒸𝓊𝓇𝓈𝒾𝓋𝑒 𝓉𝑒𝓍𝓉.',
	aliases: [],
	usage: 'cursive <message>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		if(text.length > 2000) {
			return message.channel.send('<:vError:725270799124004934> The provided message exceeds 2000 characters.');
		}

		const cursified = text.toLowerCase().split('').map(letter => {
			return `${dictionary[letter]}`;
		}).join('');

		message.channel.send(cursified);
	},
};