const moment = require('moment');
const db = require('quick.db');

module.exports = async (member) => {
	const channel = member.guild.channels.cache.find(ch => ch.id === '720997710911635533');
	if (!channel) return;
	channel.send(
		`Hey ${member} welcome to ${member.guild.name}! Be sure to read <#720997711708684308> and <#720997711708684308> and assign yourself some roles in <#720997711708684308>! We are a friendly community so don't be discouraged to chat us!`,
	);

	const logs = db.fetch(`serverlog_${member.guild.id}`);
	const logchannel = member.guild.channels.cache.get(logs);
	if (!logchannel) return;
	logchannel.send(
		`\`[${moment(member.joinedTimestamp).format('HH:mm:ss')}]\` 📥 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) joined the server.\n\`[Creation Date]\` ${moment(member.user.createdTimestamp).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
	);
};