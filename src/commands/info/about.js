/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { BOT_OWNER } = process.env;
const db = require('quick.db');

module.exports = {
	name: 'about',
	category: 'Info',
	description: 'Returns the bot\'s about page.',
	aliases: [],
	usage: 'about',
	run: async (client, message, args) => {
		let prefix;
		const prefixes = db.fetch(`prefix_${message.guild.id}`);
		if(prefixes == null) {
			prefix = process.env.BOT_PREFIX;
		}
		else {
			prefix = prefixes;
		}
		const embed = new MessageEmbed()
			.setDescription([
				`Hello! I'm **${client.user.username}**, A featureful multi-purpouse Discord bot!`,
				`Created and maintained by \`${client.users.cache.get(BOT_OWNER).tag}\`.`,
				'Built using [Node.js](https://nodejs.org/en/) and [Discord.js](https://discord.js.org/#/)',
			])
			.addFields(
				{
					name: 'Need some help?',
					value: 'Join our [Discord Server](https://discord.gg/WS3GthM)',
				},
			)
			.setFooter(`Use "${prefix}help" to list all the available commands.`)
			.setColor('BLUE');
		message.channel.send(embed);
	},
};