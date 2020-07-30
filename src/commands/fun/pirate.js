const { wordTrans } = require('custom-translate');
const dictionary = require('../../assets/json/pirate');

module.exports = {
	name: 'pirate',
	category: 'Fun',
	description: 'Converts a specified text into pirate text.',
	aliases: [],
	usage: 'pirate <message>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else {
			message.channel.send(wordTrans(text, dictionary));
		}
	},
};