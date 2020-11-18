const Guild = require('../../models/guild');
const moment = require('moment');

module.exports = async (client, member) => {
	if(!member.guild.me.hasPermission('VIEW_AUDIT_LOG')) return;
	const settings = await Guild.findOne({
		guildID: member.guild.id,
	});

	const isKicked = await member.guild.fetchAuditLogs({
		type: 'MEMBER_KICK',
	});

	const isBanned = await member.guild.fetchAuditLogs({
		type: 'MEMBER_BAN',
	});

	const logchannel = member.guild.channels.cache.get(settings.settings.serverlog);
	if (!logchannel) return;

	if(isKicked.entries.first().target.id === member.id) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` 📤 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) was kicked from the server.\n\`[Joined Date]\` ${moment(member.user.joinedAt).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
		);
	}
	else if(isBanned.entries.first().target.id === member.id) {
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