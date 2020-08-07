const moment = require('moment');
const db = require('quick.db');

module.exports = async (client, member) => {
	const welcome = db.get(`joinchannel_${member.guild.id}`);
	const goodbye = db.get(`leavechannel_${member.guild.id}`);
	let channel = member.guild.channels.cache.get(goodbye);
	if (!channel || channel === null) {
		channel = member.guild.channels.cache.get(welcome);
	}
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

	const isKicked = await member.guild.fetchAuditLogs({
		type: 'MEMBER_KICK',
	});
	const isBanned = await member.guild.fetchAuditLogs({
		type: 'MEMBER_BAN',
	});
	const memberKicked = isKicked.entries.first().target;
	const memberBanned = isBanned.entries.first().target;

	const logs = db.fetch(`serverlog_${member.guild.id}`);
	const logchannel = member.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) {return;}
	else if(memberKicked.id == member) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` 📤 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) was kicked from the server.\n\`[Joined Date]\` ${moment(member.user.joinedAt).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
		);
	}
	else if(memberBanned.id == member) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` 📤 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) was banned from the server.\n\`[Joined Date]\` ${moment(member.user.joinedAt).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
		);
	}
	else {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` 📤 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) left the server.\n\`[Joined Date]\` ${moment(member.user.joinedAt).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
		);
	}
};