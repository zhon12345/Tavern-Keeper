const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const option = {
	true: 'Yes',
	false: 'No',
};

module.exports = {
	name: 'roleinfo',
	category: 'Info',
	description: 'Displays information about a provided role.',
	aliases: ['role', 'ri'],
	usage: 'roleinfo <role>',
	run: async (client, message, args) => {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		if(!role) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid role.',
			);
		}

		let permissions;
		if(role.permissions.toArray().length !== 0) {
			permissions = role.permissions.toArray().map(x => x.split('_').map(y => y[0] + y.slice(1).toLowerCase()).join(' ')).join(', ');
		}
		else {
			permissions = 'None';
		}
		const embed = new MessageEmbed()
			.setDescription(`**Role information for ${role.name}**`)
			.setColor(role.hexColor)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addField('General', [
				`**❯ Name:** ${role.name}`,
				`**❯ ID:** ${role.id}`,
				`**❯ Hex Color:** ${role.hexColor.toUpperCase()}`,
				`**❯ Created on:** ${moment(role.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
				'\u200b',
			])
			.addField('Server', [
				`**❯ Position:** ${role.position}`,
				`**❯ Hoisted:** ${option[role.hoist]}`,
				`**❯ Mentionable:** ${option[role.mentionable]}`,
				`**❯ Members:** ${role.members.size}`,
				'\u200b',
			])
			.addField('Permissions', [
				`${permissions}`,
			]);

		return message.channel.send(embed);
	},
};