/* eslint-disable no-unused-vars */
module.exports = {
	name: 'rr',
	category: 'Fun',
	description: 'Play russian roulette.',
	aliases: ['russianroulette'],
	usage: 'rr',
	run: async (client, message, args) => {
		const n = Math.floor(Math.random() * 6);
		if(n !== 3 && 5) {
			message.channel.send(`* Click * ${message.author.username} lives for another day!`);
		}
		else {
			message.channel.send(`* Gunshot * ${message.author.username}'s head explodes and blood flies everywhere.`);
		}
	},
};