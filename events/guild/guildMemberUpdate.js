const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');


module.exports = async (client, oldMember, newMember) => {
	const logs = db.fetch(`serverlog_${oldMember.guild.id}`);
	const logchannel = oldMember.guild.channels.cache.get(logs);
	if (!logchannel && logchannel === null) {return;}

	if(newMember.user.username !== oldMember.user.username) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})'s username has been changed to **${newMember.user.username}**#${newMember.user.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}

	else if(newMember.nickname !== oldMember.nickname) {
		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})'s nickname has been changed to **${newMember.nickname ? newMember.nickname : newMember.user.username}**#${newMember.user.discriminator}.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}

	else if(newMember.user.avatarURL() !== oldMember.user.avatarURL()) {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Before', value: oldMember.avatarURL() ? oldMember.avatarURL({ dynamic: true, format: 'png' }) : 'None', inline: true },
				{ name: 'After', value: newMember.avatarURL() ? newMember.avatarURL({ dynamic: true, format: 'png' }) : 'None', inline: true },
			);

		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ **${oldMember.user.username}**#${oldMember.user.discriminator} (ID: ${oldMember.user.id})'s avatar has been changed.\n\`[Time]\` ${moment(newMember.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`, embed,
		);
	}
};