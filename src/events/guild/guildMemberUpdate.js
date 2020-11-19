const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, oldMember, newMember) => {
	if(!oldMember.guild.me.hasPermission('VIEW_AUDIT_LOG')) return;
	const settings = await Guild.findOne({
		guildID: newMember.guild.id,
	});

	const fetchedLogs = await newMember.guild.fetchAuditLogs({
		type: 'MEMBER_UPDATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor } = auditLog;

	const logchannel = oldMember.guild.channels.cache.get(settings.settings.serverlog);
	if (!logchannel) return;

	const newMemberRoles = newMember.roles.cache.map(role => role.name);
	const oldMemberRoles = oldMember.roles.cache.map(role => role.name);

	newMemberRoles.forEach(async (p) =>{
		if(!oldMemberRoles.includes(p)) {
			logchannel.send(
				`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id}) was given the \`${p}\` role by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
	});

	oldMemberRoles.forEach(async (p) => {
		if(!newMemberRoles.includes(p)) {
			logchannel.send(
				`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id}) was removed from the \`${p}\` role by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
	});

	if(newMember.nickname !== oldMember.nickname) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})'s nickname has been changed to **${newMember.nickname ? newMember.nickname : newMember.user.username}** by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}
};