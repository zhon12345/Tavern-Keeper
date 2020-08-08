const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, emoji) => {
	const settings = await Guild.findOne({
		guildID: emoji.guild.id,
	});

	const fetchedLogs = await emoji.guild.fetchAuditLogs({
		type: 'EMOJI_CREATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor, target } = auditLog;

	const logs = settings.serverlog;
	const logchannel = emoji.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) {return;}
	else if(target.id == emoji) {
		logchannel.send(
			`\`[${moment(emoji.createdTimestamp).format('HH:mm:ss')}]\` ⚒ ${emoji.name} (ID: ${emoji.id}) has been created by **${executor.username}**#${executor.discriminator}.\n\`[Emoji]\` <:${emoji.name}:${emoji.id}>`,
		);
	}
};