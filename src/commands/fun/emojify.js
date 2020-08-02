const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/emojify.json');

module.exports = {
	name: 'emojify',
	category: 'Fun',
	description: 'Changes text into emojis',
	aliases: [],
	usage: 'emojify <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		if(text.length > 2000) {
			return message.channel.send('<:vError:725270799124004934> The emojified message exceeds 2000 characters.');
		}

		message.channel.send(letterTrans(text.toLowerCase(), dictionary, ' '));
	},
};