const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');


module.exports = async (client, oldUser, newUser) => {
	const logs = db.fetch(`serverlog_${client.guilds.id}`);
	const logchannel = client.guilds.channels.cache.get(logs);
	if (!logchannel || logchannel === null) {return;}

	if(newUser.name !== oldUser.name) {
		logchannel.send(
			`\`[${moment(newUser.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldUser.name}**#${oldUser.discriminator} (ID: ${oldUser.id})'s username has been changed to **${newUser.name}**#${newUser.discriminator}.\n\`[Time]\` ${moment(newUser.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,
		);
	}

	else if(newUser.avatarURL() !== oldUser.avatarURL()) {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Before', value: oldUser.avatarURL() ? oldUser.avatarURL({ dynamic: true, format: 'png' }) : 'None', inline: true },
				{ name: 'After', value: newUser.avatarURL() ? newUser.avatarURL({ dynamic: true, format: 'png' }) : 'None', inline: true },
			);

		logchannel.send(
			`\`[${moment(newUser.createdTimestamp).format('HH:mm:ss')}]\` ✏️ **${oldUser.name}**#${oldUser.discriminator} (ID: ${oldUser.id})'s avatar has been changed.\n\`[Time]\` ${moment(newUser.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`, embed,
		);
	}
};