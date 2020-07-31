const { letterTrans } = require('custom-translate');
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
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else {
			message.channel.send(letterTrans(text, dictionary));
		}
	},
};