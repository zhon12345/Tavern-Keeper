const moment = require('moment');
const db = require('quick.db');

module.exports = async (member) => {
	const channel = member.guild.channels.cache.find(ch => ch.id === '720997710911635533');
	if (!channel) return;
	channel.send(
		`${member} just left ${member.guild.name}. Goodbye ${member}! ${member.guild.name} has ${member.guild.memberCount} members now.`,
	);

	const logs = db.fetch(`serverlog_${member.guild.id}`);
	const logchannel = member.guild.channels.cache.get(logs);
	if (!channel) return;
	logchannel.send(
		`\`[${moment(member.joinedTimestamp).format('HH:mm:ss')}]\` 📤 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) left or kicked from the server.\n\`[Joined Date]\` ${moment(member.user.joinedAt).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
	);
};