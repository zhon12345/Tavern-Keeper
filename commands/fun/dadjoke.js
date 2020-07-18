/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');

module.exports = {
	name: 'joke',
	category: 'Fun',
	description: 'Get a random joke from the internet.',
	aliases: ['joke', 'pun'],
	usage: 'joke',
	run: async (client, message, args) => {
		const url = 'https://official-joke-api.appspot.com/jokes/random';
		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		message.channel.send(`${response.setup}\n\n${response.punchline}`);
	},
};