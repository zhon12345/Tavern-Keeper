/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer',
};

const Presence = {
	offline: 'Offline',
	online: 'Online',
	idle: 'Idle',
	dnd: 'Do Not Disturb',
};

const Kickable = {
	true: 'Yes',
	false: 'No',
};

module.exports = {
	name: 'userinfo',
	category: 'Info',
	description: 'Displays information about a provided user or the message author.',
	aliases: ['user'],
	usage: 'userinfo [user]',
	run: async (client, message, args) => {
		const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray();
		const embed = new MessageEmbed()
			.setDescription(`**User information for ${member.user.username}#${member.user.discriminator}**`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addField('General', [
				`**❯ Username:** ${member.user.username}#${member.user.discriminator}`,
				`**❯ ID:** ${member.id}`,
				`**❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**❯ Time Created:** ${moment(member.user.createdTimestamp).format('Do MMMM YYYY HH:mm')}`,
				`**❯ Status:** ${Presence[member.user.presence.status]}`,
				`**❯ Voice Channel:** ${member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None' }`,
				'\u200b',
			])
			.addField('Server', [
				`**❯ Server Join Date:** ${moment(member.joinedAt).format('Do MMMM YYYY HH:mm')}`,
				`**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`**❯ Kickable:** ${Kickable[member.kickable]}`,
				`**❯ Roles [${roles.length}]:** ${roles.join(', ') || 'None'}`,
				'\u200b',
			]);
		return message.channel.send(embed);
	},
};