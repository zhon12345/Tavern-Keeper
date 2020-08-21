const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Guild = require('../../models/guild');

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

	const settings = await Guild.findOne({
		guildID: newChannel.guild.id,
	});

	const fetchedLogs = await newChannel.guild.fetchAuditLogs({
		type: 'CHANNEL_UPDATE',
	});
	const auditLog = fetchedLogs.entries.first();
	const { executor, target } = auditLog;
	if(!executor) return;

	const logs = settings.settings.serverlog;
	const logchannel = oldChannel.guild.channels.cache.get(logs);
	if (!logchannel) {return;}
	else if(target.id == oldChannel) {
		if(newChannel.name !== oldChannel.name) {
			const embed = new MessageEmbed()
				.setColor('YELLOW')
				.addFields(
					{ name: 'Channel:', value: oldChannel },
					{ name: 'Before', value: oldChannel.name, inline: true },
					{ name: 'After', value: newChannel.name, inline: true },
				);
			logchannel.send(
				`\`[${moment(Date.now()).format('HH:mm:ss')}]\` ✏️ #${oldChannel.name} (ID: ${oldChannel.id})'s name has been changed by **${executor.username}**#${executor.discriminator}.\n\`[Type]\` ${types[oldChannel.type]}`, embed,
			);
		}
		else if(newChannel.topic !== oldChannel.topic) {
			const embed = new MessageEmbed()
				.setColor('YELLOW')
				.addFields(
					{ name: 'Channel:', value: oldChannel },
					{ name: 'Before', value: oldChannel.topic ? oldChannel.topic : 'None', inline: true },
					{ name: 'After', value: newChannel.topic ? newChannel.topic : 'None', inline: true },
				);
			logchannel.send(
				`\`[${moment(newChannel.createdTimestamo).format('HH:mm:ss')}]\` ✏️ #${oldChannel.name} (ID: ${oldChannel.id})'s topic has been changed by **${executor.username}**#${executor.discriminator}.\n\`[Type]\` ${types[oldChannel.type]}`, embed,
			);
		}
	}
};