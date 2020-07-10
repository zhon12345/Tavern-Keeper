const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

const types = {
	dm: 'DM',
	text: 'Text',
	voice: 'Voice',
	category: 'Category',
	news: 'News',
	store: 'Store',
	unknown: 'Unknown',
};

module.exports = async (client, oldChannel, newChannel) => {
	if(newChannel.type === 'dm') return;
	const logs = db.fetch(`serverlog_${oldChannel.guild.id}`);
	const logchannel = oldChannel.guild.channels.cache.get(logs);
	if (!logchannel && logchannel === null) {return;}

	if(newChannel.name !== oldChannel.name) {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Channel:', value: oldChannel },
				{ name: 'Before', value: oldChannel.name, inline: true },
				{ name: 'After', value: newChannel.name, inline: true },
			);

		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ #${oldChannel.name} (ID: ${oldChannel.id})'s name has been edited.\n\`[Type]\` ${types[oldChannel.type]}`, embed,
		);
	}

	else if(newChannel.topic !== oldChannel.topic) {
		const embed = new MessageEmbed()
			.setColor('YELLOW')
			.addFields(
				{ name: 'Channel:', value: oldChannel },
				{ name: 'Before', value: oldChannel.topic, inline: true },
				{ name: 'After', value: newChannel.topic, inline: true },
			);

		logchannel.send(
			`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ #${oldChannel.name} (ID: ${oldChannel.id})'s topic has been edited.\n\`[Type]\` ${types[oldChannel.type]}`, embed,
		);
	}
};