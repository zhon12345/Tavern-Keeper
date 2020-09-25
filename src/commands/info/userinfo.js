const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const Presence = {
	offline: 'Offline',
	online: 'Online',
	idle: 'Idle',
	dnd: 'Do Not Disturb',
};

module.exports = {
	name: 'userinfo',
	category: 'Info',
	description: 'Displays information about a provided user or the message author.',
	aliases: ['user', 'ui'],
	usage: 'userinfo [user]',
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.name.toString()).slice(0, 15);
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || 'BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setTitle('User Information')
			.addFields(
				{ name: 'Username', value: `\`\`\`${member.user.tag}\`\`\``, inline:true },
				{ name: 'ID', value: `\`\`\`${member.id}\`\`\``, inline:true },
				{ name: `Roles [${roles.length}]`, value: `\`\`\`${roles ? roles.join('\n').split('@everyone').join('') : 'None'}\`\`\`` },
				{ name: 'Status', value: `\`\`\`${Presence[member.user.presence.status]}\`\`\``, inline:true },
				{ name: 'Highest Role', value: `\`\`\`${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}\`\`\``, inline:true },
				{ name: 'Created', value: `\`\`\`${moment(member.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - member.user.createdTimestamp) / 86400000)} day(s) ago\`\`\`` },
				{ name: 'Joined', value: `\`\`\`${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - member.joinedAt) / 86400000)} day(s) ago\`\`\`` },
			);
		return message.channel.send(embed);
	},
};