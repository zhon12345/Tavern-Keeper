const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports = async (client, oldRole, newRole) => {
	const logs = db.fetch(`serverlog_${oldRole.guild.id}`);
	const channel = oldRole.guild.channels.cache.get(logs);
	if (!channel || channel === null) return;

	const newRolePerms = newRole.permissions.toArray();
	const oldRolePerms = oldRole.permissions.toArray();

	newRolePerms.forEach(async (p) =>{
		if(!oldRolePerms.includes(p)) {
			channel.send(
				`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldRole.name} (ID: ${oldRole.id})'s permissions has been changed.\n\`[Added]\` ${p[0] + p.slice(1).toLowerCase().replace(/_/g, ' ')}`,
			);
		}
		else{
			return;
		}
	});

	oldRolePerms.forEach(async (p)=>{
		if(!newRolePerms.includes(p)) {
			channel.send(
				`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldRole.name} (ID: ${oldRole.id})'s permissions has been changed.\n\`[Removed]\` ${p[0] + p.slice(1).toLowerCase().replace(/_/g, ' ')}`,
			);
		}
	});

	if(newRole.name !== oldRole.name) {
		channel.send(
			`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldRole.name} (ID: ${oldRole.id})'s name has been changed to ${newRole.name}.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}
	else if(newRole.hexColor !== oldRole.hexColor) {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Before', value: oldRole.hexColor.toUpperCase(), inline: true },
				{ name: 'After', value: newRole.hexColor.toUpperCase(), inline: true },
			);
		channel.send(
			`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldRole.name} (ID: ${oldRole.id})'s color has been changed.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`, embed,
		);
	}
	else if(newRole.hoist == true && oldRole.hoist == false) {
		channel.send(
			`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldRole.name} (ID: ${oldRole.id}) has been hoisted.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}
	else if(newRole.hoist == false && oldRole.hoist == true) {
		channel.send(
			`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldRole.name} (ID: ${oldRole.id}) has been unhoisted.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}
};