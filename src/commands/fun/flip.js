const fetch = require('node-fetch');

module.exports = {
	name: 'flip',
	category: 'Fun',
	description: 'pilF specified text.',
	aliases: [],
	usage: 'flip <message>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}
		const url = `https://www.no-api-key.com/api/v1/flip-text?text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		message.channel.send(response.message);
	},
};