/* eslint-disable no-unused-vars */
const texts = require('../../assets/json/kill.json');
module.exports = {
	name: 'kill',
	category: 'Fun',
	description: 'Attempt to kill a specified user.',
	aliases: [],
	usage: 'kill <user>',
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;
		const randomAnswer = texts[Math.floor(Math.random() * texts.length)];
		const text = randomAnswer
			.split('{user}').join(`${user.username}`)
			.split('{author}').join(`${message.author.username}`);
		message.channel.send(text);
	},
};