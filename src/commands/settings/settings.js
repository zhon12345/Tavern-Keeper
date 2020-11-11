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

		const muterole = message.guild.roles.cache.get(settings.settings.muterole);
		const verifiedrole = message.guild.roles.cache.get(settings.settings.verifyrole);
		const modlog = message.guild.channels.cache.get(settings.settings.modlog);
		const serverlog = message.guild.channels.cache.get(settings.settings.serverlog);
		const messagelog = message.guild.channels.cache.get(settings.settings.messagelog);
		const joinchannel = message.guild.channels.cache.get(settings.welcomer.joinchannel);
		const leavechannel = message.guild.channels.cache.get(settings.welcomer.leavechannel);

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
				`> **Muted Role:** ${settings.settings.muterole ? muterole : '`None`'}`,
				`> **Verified Role:** ${settings.settings.verifyrole ? verifiedrole : '`None`'}`,
				`> **Mod Log: ${settings.settings.modlog ? modlog : '`None`'}**`,
				`> **Server Log: ${settings.settings.serverlog ? serverlog : '`None`'}**`,
				`> **Message Log: ${settings.settings.messagelog ? messagelog : '`None`'}**`,
				'\u200b',
			])
			.addField('<:documents:773950876347793449> Welcomer ❯', [
				`> **Join channel: ${settings.welcomer.joinchannel ? joinchannel : '`None`'}**`,
				`> **Leave channel: ${settings.welcomer.leavechannel ? leavechannel : '`None`'}**`,
				`> **Join message: \n> \`${settings.welcomer.jointext ? settings.welcomer.jointext : 'None'}\`**`,
				`> **Leave message: \n> \`${settings.welcomer.leavetext ? settings.welcomer.leavetext : 'None'}\`**`,
			]);
		return message.channel.send(embed);
	},
};