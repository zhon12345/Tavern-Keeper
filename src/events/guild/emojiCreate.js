const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, emoji) => {
	if(!emoji.guild.me.hasPermission('VIEW_AUDIT_LOG')) return;
	const settings = await Guild.findOne({
		guildID: emoji.guild.id,
	});

	const fetchedLogs = await emoji.guild.fetchAuditLogs({
		type: 'EMOJI_CREATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor } = auditLog;
	if(!executor) return;

	const logchannel = emoji.guild.channels.cache.get(settings.settings.serverlog);
	if (!logchannel) return;

	logchannel.send(
		`\`[${moment(emoji.createdTimestamp).format('HH:mm:ss')}]\` ⚒ \`${emoji.name}\` (ID: ${emoji.id}) has been created by **${executor.username}**#${executor.discriminator}.\n\`[Emoji]\` <:${emoji.name}:${emoji.id}>`,
	);

};