const dictionary = require('../../assets/json/vaporwave.json');

module.exports = {
	name: 'vaporwave',
	aliases: ['aesthetic'],
	description: 'Converts text into ｖａｐｏｒｗａｖｅ.',
	usage: 'vapourwave <text>',
	category: 'Fun',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		if(text.length > 2000) {
			return message.channel.send('<:vError:725270799124004934> The emojified message exceeds 2000 characters.');
		}

		const vapour = text.split('').map(letter => {
			return `${dictionary[letter]}`;
		}).join('');

		message.channel.send(vapour);
	},
};