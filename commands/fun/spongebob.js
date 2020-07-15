const { alternateCaps } = require('../../functions');

module.exports = {
	name: 'spongebob',
	category: 'Fun',
	description: 'Generate a spongebob mocking text',
	aliases: [],
	usage: 'clapify <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				':vError:725270799124004934> Please provide valid text.',
			);
		}
		else {
			message.channel.send(`${alternateCaps(text)}`);
		}
	},
};