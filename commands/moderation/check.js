/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'check',
	category: 'Moderation',
	description: 'Get the warnings of you or specfied person.',
	aliases: ['warnings'],
	usage: 'check [@user | userid]',
	guildOnly: true,
	run: (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		let warnings = db.get(`warnings_${message.guild.id}_${member.id}`);

		if(warnings === null) warnings = 0;

		message.channel.send([
			`<:vSuccess:725270799098970112> Moderation information for **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`,
			`❯ 🚩 Strikes: **${warnings}**`,
		]);


	},
};