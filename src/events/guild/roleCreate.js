const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, role) => {
	const settings = await Guild.findOne({
		guildID: role.guild.id,
	});

	const fetchedLogs = await role.guild.fetchAuditLogs({
		type: 'ROLE_CREATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor, target } = auditLog;
	if(!executor) return;

	const logs = settings.settings.serverlog;
	const logchannel = role.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) {return;}
	else if(target.id == role) {
		logchannel.send(
			`\`[${moment(role.createdTimestamp).format('HH:mm:ss')}]\` ⚒ ${role.name} (ID: ${role.id}) has been created by **${executor.username}**#${executor.discriminator}.\n\`[Permissions]\` ${role.permissions.toArray().map(p => p[0] + p.slice(1).toLowerCase()).join(', ').replace(/_/g, ' ')}`,
		);
	}
};