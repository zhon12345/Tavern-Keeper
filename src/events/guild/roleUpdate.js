const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, oldRole, newRole) => {
	const settings = await Guild.findOne({
		guildID: newRole.guild.id,
	});

	const fetchedLogs = await newRole.guild.fetchAuditLogs({
		type: 'ROLE_UPDATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor, target } = auditLog;
	if(!executor) return;

	const logs = settings.settings.serverlog;
	const logchannel = oldRole.guild.channels.cache.get(logs);
	if (!logchannel) {return;}
	else if(target.id == oldRole) {
		const newRolePerms = newRole.permissions.toArray();
		const oldRolePerms = oldRole.permissions.toArray();

		newRolePerms.forEach(async (p) =>{
			if(!oldRolePerms.includes(p)) {
				logchannel.send(
					`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id})'s permissions has been changed by **${executor.username}**#${executor.discriminator}.\n\`[Added]\` ${p[0] + p.slice(1).toLowerCase().replace(/_/g, ' ')}`,
				);
			}
			else{
				return;
			}
		});
		oldRolePerms.forEach(async (p)=>{
			if(!newRolePerms.includes(p)) {
				logchannel.send(
					`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id})'s permissions has been changed by **${executor.username}**#${executor.discriminator}.\n\`[Removed]\` ${p[0] + p.slice(1).toLowerCase().replace(/_/g, ' ')}`,
				);
			}
		});
		if(newRole.name !== oldRole.name) {
			logchannel.send(
				`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id})'s name has been changed to ${newRole.name} by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
		else if(newRole.hexColor !== oldRole.hexColor) {
			const embed = new MessageEmbed()
				.setColor('YELLOW')
				.addFields(
					{ name: 'Before', value: oldRole.hexColor.toUpperCase(), inline: true },
					{ name: 'After', value: newRole.hexColor.toUpperCase(), inline: true },
				);
			logchannel.send(
				`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id})'s color has been changed by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`, embed,
			);
		}
		else if(newRole.hoist === true && oldRole.hoist === false) {
			logchannel.send(
				`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id}) has been hoisted by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
		else if(newRole.hoist === false && oldRole.hoist === true) {
			logchannel.send(
				`\`[${moment(newRole.createdTimestamp).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id}) has been unhoisted by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
	}
};
