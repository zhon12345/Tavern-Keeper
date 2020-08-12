const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = async (client, member) => {
	const settings = await Guild.findOne({
		guildID: member.guild.id,
	});

	const welcome = settings.welcomer.joinchannel;
	const channel = member.guild.channels.cache.get(welcome);
	if (!channel || channel === null) return;
	const msg = settings.welcomer.jointext;
	if (!msg || msg === null) return;
	const message = msg
		.split('{user.name}').join(member.user.username)
		.split('{user.discriminator}').join(member.user.discriminator)
		.split('{user.id}').join(member.id)
		.split('{user.mention}').join(member)
		.split('{guild.name}').join(member.guild.name)
		.split('{guild.membercount}').join(member.guild.memberCount);
	channel.send(message);

	const logs = settings.settings.serverlog;
	const logchannel = member.guild.channels.cache.get(logs);
	if (!logchannel || logchannel === null) return;
	logchannel.send(
		`\`[${moment(member.joinedTimestamp).format('HH:mm:ss')}]\` 📥 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) joined the server.\n\`[Creation Date]\` ${moment(member.user.createdTimestamp).format('dddd, Do MMMM YYYY, h:mm:ss a')}`,
	);
};