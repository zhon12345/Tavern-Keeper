const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/cursive.json');

module.exports = {
	name: 'cursive',
	category: 'Fun',
	description: 'Converts a specified text into cursive text.',
	aliases: [],
	usage: 'cursive <message>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else {
			message.channel.send(letterTrans(text, dictionary));
		}
	},
};