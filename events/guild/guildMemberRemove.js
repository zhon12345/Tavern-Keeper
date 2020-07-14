const moment = require('moment');
const db = require('quick.db');

module.exports = async (client, member) => {
	const goodbye = db.get(`leavechannel_${member.guild.id}`);
	const channel = member.guild.channels.cache.get(goodbye);
	if (!channel || channel === null) return;
	const msg = db.get(`leavetext_${member.guild.id}`);
	if (!msg || msg === null) return;
	const message = msg
		.split('{user.name}').join(member.user.username)
		.split('{user.discriminator}').join(member.user.discriminator)
		.split('{user.id}').join(member.id)
		.split('{user.mention}').join(member)
		.split('{guild.name}').join(member.guild.name)
		.split('{guild.membercount}').join(member.guild.memberCount);
	channel.send(message);

	const logs = db.fetch(`serverlog_${member.guild.id}`);
	const logchannel = member.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) return;
	logchannel.send(
		`\`[${moment(Date.now()).format('HH:mm:ss')}]\` 📤 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) left or kicked from the server.\n\`[Joined Date]\` ${moment(member.user.joinedAt).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
	);
};