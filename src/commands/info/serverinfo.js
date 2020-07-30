/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone',
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
};

const regions = {
	brazil: ':flag_br: Brazil',
	europe: ':flag_eu: Europe',
	hongkong: ':flag_hk: Hong Kong',
	india: ':flag_in: India',
	japan: ':flag_jp: Japan',
	russia: ':flag_ru: Russia',
	singapore: ':flag_sg: Singapore',
	southafrica: ':flag_za: South Africa',
	sydeny: ':flag_au: Sydeny',
	'us-central': ':flag_us: US Central',
	'us-east': ':flag_us: US East',
	'us-west': ':flag_us: US West',
	'us-south': ':flag_us: US South',
};

module.exports = {
	name: 'serverinfo',
	category: 'Info',
	description: 'Displays information about the server.',
	aliases: ['server', 'guild', 'guildinfo'],
	usage: 'serverinfo',
	run: async (cient, message, args) => {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Guild information for ${message.guild.name}**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General', [
				`**❯ Name:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Owner:** ${message.guild.owner.user.tag}`,
				`**❯ Owner ID:** ${message.guild.ownerID}`,
				`**❯ Region:** ${regions[message.guild.region]}`,
				`**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('Do MMMM YYYY HH:mm')}`,
				'\u200b',
			])
			.addField('Statistics', [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${emojis.size} (${emojis.filter(emoji => !emoji.animated).size} **Regular** ${emojis.filter(emoji => emoji.animated).size} **Animated**)`,
				`**❯ Member Count:** ${message.guild.memberCount} (${members.filter(member => !member.user.bot).size} **Users** ${members.filter(member => member.user.bot).size} **Bots**)`,
				`**❯ Channels:** ${channels.filter(channel => channel.type === 'text').size} **Text** ${channels.filter(channel => channel.type === 'voice').size} **Voice**`,
				`**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b',
			])
			.addField('Presence', [
				`**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b',
			])
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();
		message.channel.send(embed);
	},

};