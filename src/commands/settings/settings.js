/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
	name: 'settings',
	category: 'Settings',
	description: 'Displays the server\'s settings.',
	aliases: ['setting'],
	usage: 'settings',
	userperms: ['ADMINISTRATOR'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const embed = new MessageEmbed()
			.setTitle(`${client.user.username}'s Settings`)
			.setColor('BLUE')
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addField('<:documents:773950876347793449> Settings ❯', [
				`> **Prefix: \`${settings.prefix}\`**`,
				`> **Anti Profanity: \`${settings.settings.antiprofanity ? 'On' : 'Off'}\`**`,
				`> **Anti Links: \`${settings.settings.antilinks ? 'On' : 'Off'}\`**`,
				`> **Muted Role:** ${settings.settings.muterole ? message.guild.roles.cache.get(settings.settings.muterole) : '`None`'}`,
				`> **Member Role:** ${settings.settings.memberrole ? message.guild.roles.cache.get(settings.settings.memberrole) : '`None`'}`,
				`> **Mod Log: ${settings.settings.modlog ? message.guild.channels.cache.get(settings.settings.modlog) : '`None`'}**`,
				`> **Server Log: ${settings.settings.serverlog ? message.guild.channels.cache.get(settings.settings.serverlog) : '`None`'}**`,
				`> **Message Log: ${settings.settings.messagelog ? message.guild.channels.cache.get(settings.settings.messagelog) : '`None`'}**`,
			]);
		return message.channel.send(embed);
	},
};