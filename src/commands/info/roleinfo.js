const { formatPerms } = require('../../functions');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'roleinfo',
	category: 'Info',
	description: 'Displays information about a provided role.',
	aliases: ['role', 'ri'],
	usage: 'roleinfo <role>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if(!role) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid role.',
			);
		}

		let permissions;
		if(role.permissions.toArray().length !== 0) {
			permissions = role.permissions.toArray().map(formatPerms).join('`, `');
		}
		else {
			permissions = 'None';
		}
		const embed = new MessageEmbed()
			.setColor(role.hexColor)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setTitle('Role Information')
			.addField('<:documents:773950876347793449> General ❯', [
				`> **<:card:773965449402646549> Role Name: \`${role.name}\`**`,
				`> **\\📇 Role ID: \`${role.id}\`**`,
				`> **<:hashtag:774084894409883648> Hex Color: \`${role.hexColor.toUpperCase()}\`**`,
				`> **\\👥 Members: \`${role.members.size}\`**`,
				`> **\\🏆 Hoisted: \`${role.hoist ? 'Yes' : 'No'}\`**`,
				`> **<:mention:774084592709664830> Mentionable: \`${role.hoist ? 'Yes' : 'No'}\`**`,
				`> **\\📅 Created: \`${moment(role.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')}\` | \`${Math.floor((Date.now() - role.createdTimestamp) / 86400000)}\` day(s) ago**`,
				'\u200b',
			])
			.addField('<:documents:773950876347793449> Permissions ❯', [
				`>>> **\`${permissions}\`**`,
			]);

		return message.channel.send(embed);
	},
};