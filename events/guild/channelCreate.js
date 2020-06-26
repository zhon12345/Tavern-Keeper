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

module.exports = async (channel) => {
	const logs = db.fetch(`serverlog_${channel.guild.id}`);
	const logchannel = channel.guild.channels.cache.get(logs);
	if (!logchannel) return;
	logchannel.send(
		`\`[${moment(channel.createdTimestamp).format('HH:mm:ss')}]\` ⚒ ${channel} (ID: ${channel.id}) has been created.\n\`[Type]\` ${types[channel.type]}`,
	);
};