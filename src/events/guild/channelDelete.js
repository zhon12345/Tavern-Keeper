const moment = require('moment');
const db = require('quick.db');

const types = {
	dm: 'DM',
	text: 'Text',
	voice: 'Voice',
	category: 'Category',
	news: 'News',
	store: 'Store',
	unknown: 'Unknown',
};

module.exports = async (client, channel) => {
	if(channel.type === 'dm') return;
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		type: 'CHANNEL_DELETE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor, target } = auditLog;

	const logs = db.fetch(`serverlog_${channel.guild.id}`);
	const logchannel = channel.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) {return;}
	else if(target.id == channel) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ❌ #${channel.name} (ID: ${channel.id}) has been deleted by **${executor.username}**#${executor.discriminator} .\n\`[Type]\` ${types[channel.type]}`,
		);
	}
};