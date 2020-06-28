const moment = require('moment');
const db = require('quick.db');

module.exports = async (member) => {
	const welcome = db.get(`welcome_${member.guild.id}`);
	const channel = member.guild.channels.cache.get(welcome);
	const msg = db.get(`welcomemsg_${member.guild.id}`);
	const message = msg
		.replace('{name}', member.user.username)
		.replace('{discriminator}', member.user.discriminator)
		.replace('{id}', member.id)
		.replace('{mention}', member)
		.replace('{server}', member.guild.name)
		.replace('{membercount}', member.guild.memberCount);
	if (!channel) return;
	channel.send(message);

	const logs = db.fetch(`serverlog_${member.guild.id}`);
	const logchannel = member.guild.channels.cache.get(logs);
	if (!logchannel) return;
	logchannel.send(
		`\`[${moment(member.joinedTimestamp).format('HH:mm:ss')}]\` 📥 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) joined the server.\n\`[Creation Date]\` ${moment(member.user.createdTimestamp).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
	);
};