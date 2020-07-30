const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');


module.exports = async (client, oldGuild, newGuild) => {
	const logs = db.fetch(`serverlog_${oldGuild.id}`);
	const logchannel = oldGuild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) {return;}

	if(newGuild.name !== oldGuild.name) {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Before', value: oldGuild.name, inline: true },
				{ name: 'After', value: newGuild.name, inline: true },
			);

		logchannel.send(
			`\`[${moment(newGuild.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldGuild.name} (ID: ${oldGuild.id})'s name has been changed to ${newGuild.name}.\n\`[Time]\` ${moment(newGuild.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`, embed,
		);
	}

	else if(newGuild.iconURL({ dynamic: true, format: 'png' }) !== oldGuild.iconURL({ dynamic: true, format: 'png' })) {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Before', value: oldGuild.iconURL() ? oldGuild.iconURL({ dynamic: true, format: 'png' }) : 'None', inline: true },
				{ name: 'After', value: newGuild.iconURL() ? newGuild.iconURL({ dynamic: true, format: 'png' }) : 'None', inline: true },
			);

		logchannel.send(
			`\`[${moment(newGuild.createdTimestamp).format('HH:mm:ss')}]\` ✏️ ${oldGuild.name} (ID: ${oldGuild.id})'s icon has been changed.\n\`[Time]\` ${moment(newGuild.createdTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')}`, embed,
		);
	}
};