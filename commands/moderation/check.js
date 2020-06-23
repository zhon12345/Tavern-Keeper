/* eslint-disable no-unused-vars */
const warns = require('../../models/warns');
const { MessageEmbed } = require('discord.js');
const prefix = process.env.prefix;

module.exports = {
	name: 'check',
	description: 'Get a user\'s warns in the guild!',
	aliases: ['warnings'],
	category: 'Moderation',
	usage: `${prefix}check <@user>`,
	run: async (client, message, args) => {
		const user = message.mentions.members.first();
		if (!user) {
			return message.channel.send(
				'You did not specify a user to check.',
			);
		}

		warns.find(
			{ Guild: message.guild.id, User: user.id },
			async (err, data) => {
				if (err) console.log(err);
				if (!data.length) {
					return message.channel.send(
						`${user.user.tag} do not have any warns.`,
					);
				}
				const Embed = new MessageEmbed()
					.setTitle(`${user.user.tag}'s warns in ${message.guild.name}.. `)
					.setColor('BLUE')
					.setDescription(
						data.map((d) => {
							return d.Warns.map(
								(w, i) =>
									`${i} - Moderator: ${
										message.guild.members.cache.get(w.Moderator).user.tag
									} Reason: ${w.Reason}`,
							).join('\n');
						}),
					);
				message.channel.send(Embed);
			},
		);
	},
};