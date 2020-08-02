const moment = require('moment');
const db = require('quick.db');

module.exports = async (client, emoji) => {
	const logs = db.fetch(`serverlog_${emoji.guild.id}`);
	const logchannel = emoji.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) return;
	logchannel.send(
		`\`[${moment(emoji.createdTimestamp).format('HH:mm:ss')}]\` ⚒ ${emoji.name} (ID: ${emoji.id}) has been created.\n\`[Emoji]\` <:${emoji.name}:${emoji.id}>`,
	);
};