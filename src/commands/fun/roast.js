/* eslint-disable no-unused-vars */
const roasts = require('../../assets/json/roast.json');
const { BOT_OWNER } = process.env;

module.exports = {
	name: 'roast',
	category: 'Fun',
	description: 'Sick of someone? Easy! Just roast them!',
	aliases: ['insult'],
	usage: 'roast [user]',
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		if (member.id === BOT_OWNER) {
			return message.channel.send(
				`${client.users.cache.get(BOT_OWNER).username} is too perfect for me to find a flaw.`,
			);
		}
		return message.channel.send(`${member.user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
	},
};