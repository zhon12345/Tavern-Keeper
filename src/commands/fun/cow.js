/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');

module.exports = {
	name: 'cow',
	category: 'Fun',
	description: 'Make a cow to say anything you want.',
	aliases: [],
	usage: 'cow',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		const url = `http://cowsay.morecode.org/say?format=json&message=${encodeURI(text)}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}
		return message.channel.send(`\`\`\`\n${response.cow}\n\`\`\``, true);
	},
};