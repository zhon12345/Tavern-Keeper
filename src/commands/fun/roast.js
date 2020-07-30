/* eslint-disable no-unused-vars */
const roasts = require('../../assets/json/roast.json');

module.exports = {
	name: 'roast',
	category: 'Fun',
	description: 'Roasts a specified user.',
	aliases: ['insult'],
	usage: 'roast [user]',
	run: async (client, message, args) => {
		let member;
		if (message.mentions.users.first()) {
			member = message.mentions.users.first();
		}
		else if (!isNaN(args[0])) {
			member = message.guild.members.cache.get(args[0]).user;
		}
		else {
			member = message.author;
		}
		return message.channel.send(`${member.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
	},
};