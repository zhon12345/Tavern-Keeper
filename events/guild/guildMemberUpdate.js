const moment = require('moment');
const db = require('quick.db');


module.exports = async (client, oldMember, newMember) => {
	const logs = db.fetch(`serverlog_${oldMember.guild.id}`);
	const logchannel = oldMember.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) {return;}

	const newMemberRoles = newMember.roles.cache.map(role => role.name.toString());
	const oldMemberRoles = oldMember.roles.cache.map(role => role.name.toString());

	newMemberRoles.forEach(async (p) =>{
		if(!oldMemberRoles.includes(p)) {
			logchannel.send(
				`\`[${moment(newMember.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})was given the \`${p}\` role.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
		else{
			return;
		}
	});

	oldMemberRoles.forEach(async (p)=>{
		if(!newMemberRoles.includes(p)) {
			logchannel.send(
				`\`[${moment(newMember.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})was removed from the \`${p}\` role.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
			);
		}
	});

	if(newMember.nickname !== oldMember.nickname) {
		logchannel.send(
			`\`[${moment(newMember.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})'s nickname has been changed to **${newMember.nickname ? newMember.nickname : newMember.user.username}**#${newMember.user.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}
};