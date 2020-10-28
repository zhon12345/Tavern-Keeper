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
			);
		}
		if(text.length > 2000) {
			return message.channel.send('<:vError:725270799124004934> The provided message exceeds 2000 characters.');
		}

		message.channel.send(owoify(text));
	},
};