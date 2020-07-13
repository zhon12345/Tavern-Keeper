/* eslint-disable no-unused-vars */
const customDiscordJokes = require('custom-discord-jokes');

module.exports = {
	name: 'dadjoke',
	category: 'Fun',
	description: 'Get a random dad joke.',
	aliases: ['joke', 'dadpun'],
	usage: 'dadjoke',
	run: async (client, message, args) => {
		customDiscordJokes.getRandomDadJoke (function(joke) {
			message.channel.send(joke);
		});
	},
};