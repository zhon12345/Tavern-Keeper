const moment = require('moment');
const db = require('quick.db');


module.exports = async (client, role) => {
	const logs = db.fetch(`serverlog_${role.guild.id}`);
	const logchannel = role.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) return;
	logchannel.send(
		`\`[${moment(role.createdTimestamp).format('HH:mm:ss')}]\` ⚒ ${role.name} (ID: ${role.id}) has been created.\n\`[Permissions]\` ${role.permissions.toArray().map(p => p[0] + p.slice(1).toLowerCase()).join(', ').replace(/_/g, ' ')}`,
	);
};