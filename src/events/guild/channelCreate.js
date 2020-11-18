const moment = require('moment');
const Guild = require('../../models/guild');

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
	if(!channel.guild.me.hasPermission('VIEW_AUDIT_LOG')) return;

	const settings = await Guild.findOne({
		guildID: channel.guild.id,
	});

	const fetchedLogs = await channel.guild.fetchAuditLogs({
		type: 'CHANNEL_CREATE',
	});

	const auditLog = fetchedLogs.entries.first();
	const { executor } = auditLog;
	if(!executor) return;

	const logs = settings.settings.serverlog;
	const logchannel = channel.guild.channels.cache.get(logs);
	if (!logchannel) return;

	logchannel.send(
		`\`[${moment(channel.createdTimestamp).format('HH:mm:ss')}]\` ⚒ \`${channel.name}\` (ID: ${channel.id}) has been created by **${executor.username}**#${executor.discriminator} .\n\`[Type]\` ${types[channel.type]}`,
	);

};