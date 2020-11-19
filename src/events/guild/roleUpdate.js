const moment = require('moment');
const Guild = require('../../models/guild');
const { formatPerms, arrayDiff } = require('../../functions');

module.exports = async (client, oldRole, newRole) => {
	if(!oldRole.guild.me.hasPermission('VIEW_AUDIT_LOG')) return;
	const settings = await Guild.findOne({
		guildID: newRole.guild.id,
	});

	const fetchedLogs = await newRole.guild.fetchAuditLogs({
		type: 'ROLE_UPDATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor } = auditLog;
	if(!executor) return;

	const logchannel = oldRole.guild.channels.cache.get(settings.settings.serverlog);
	if (!logchannel) return;

	const newRolePerms = newRole.permissions.toArray();
	const oldRolePerms = oldRole.permissions.toArray();

	if(newRolePerms.includes('ADMINISTRATOR') && oldRolePerms.includes('ADMINISTRATOR')) {
		if(newRolePerms !== oldRolePerms) {
			logchannel.send(
				`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id})'s permissions has been changed by **${executor.username}**#${executor.discriminator}.\n\`[${newRolePerms.length > oldRolePerms.length ? 'Added' : 'Removed'}]\` ${arrayDiff(newRolePerms, oldRolePerms).map(formatPerms).join(', ')}`,
			);
		}
	}

	if(newRole.name !== oldRole.name) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ \`${oldRole.name}\` (ID: ${oldRole.id})'s name has been changed to \`${newRole.name}\` by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newRole.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}
};