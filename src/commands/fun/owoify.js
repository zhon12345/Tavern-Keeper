const fetch = require('node-fetch');

module.exports = {
	name: 'owoify',
	category: 'Fun',
	description: 'OwOify a provided text.',
	aliases: [],
	usage: 'owoify <text>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'`❌` Please provide valid text.',
			);
		}
		if(text.length > 200) {
			return message.channel.send('`❌` The provided message exceeds 200 characters.');
		}

		const url = `https://nekos.life/api/v2/owoify?text=${encodeURIComponent(text)}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'`❌` An error occurred, please try again!',
			);
		}

		message.channel.send(response.owo);
	},
};