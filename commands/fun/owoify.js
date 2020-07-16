const { owoify } = require('../../functions');

module.exports = {
	name: 'owoify',
	category: 'Fun',
	description: 'OwOify a provided text.',
	aliases: [],
	usage: 'owoify <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else {
			message.channel.send(owoify(text));
		}
	},
};