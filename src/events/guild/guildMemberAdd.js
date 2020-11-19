const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, member) => {
	const settings = await Guild.findOne({
		guildID: member.guild.id,
	});

	const logchannel = member.guild.channels.cache.get(settings.settings.serverlog);
	if (!logchannel) return;

	logchannel.send(
		`\`[${moment(member.joinedTimestamp).format('HH:mm:ss')}]\` 📥 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) joined the server.\n\`[Creation Date]\` ${moment(member.user.createdTimestamp).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
	);
};