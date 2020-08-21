const moment = require('moment');
const Guild = require('../../models/guild');


module.exports = async (client, oldMember, newMember) => {
	const settings = await Guild.findOne({
		guildID: newMember.guild.id,
	});

	const fetchedLogs = await newMember.guild.fetchAuditLogs({
		type: 'MEMBER_UPDATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor, target } = auditLog;

	const logs = settings.settings.serverlog;
	const logchannel = oldMember.guild.channels.cache.get(logs);
	if (!logchannel) {return;}
	else if(target.id == oldMember) {
		const newMemberRoles = newMember.roles.cache.map(role => role.name.toString());
		const oldMemberRoles = oldMember.roles.cache.map(role => role.name.toString());

		newMemberRoles.forEach(async (p) =>{
			if(!oldMemberRoles.includes(p)) {
				logchannel.send(
					`\`[${moment(newMember.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id}) was given the \`${p}\` role by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
				);
			}
		});

		oldMemberRoles.forEach(async (p)=>{
			if(!newMemberRoles.includes(p)) {
				logchannel.send(
					`\`[${moment(newMember.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id}) was removed from the \`${p}\` role by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
				);
			}
		});
		if(newMember.nickname !== oldMember.nickname) {
			logchannel.send(
				`\`[${moment(newMember.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})'s nickname has been changed to **${newMember.nickname ? newMember.nickname : newMember.user.username}**#${newMember.user.discriminator} by **${executor.username}**#${executor.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
	}
};