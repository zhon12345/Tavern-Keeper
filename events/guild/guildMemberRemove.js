const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = async (client, member) => {
	const settings = await Guild.findOne({
		guildID: member.guild.id,
	});

	const logchannel = member.guild.channels.cache.get(settings.settings.serverlog);
	if (!logchannel) return;

	logchannel.send(
		`\`[${moment(Date.now()).format("HH:mm:ss")}]\` 📤 **${member.user.username}**#${member.user.discriminator} (ID: ${member.user.id}) left, kicked or was banned from the server.\n\`[Joined Date]\` ${moment(member.user.joinedAt).format("dddd, Do MMMM YYYY, h:mm:ss a")}`,
	);
};
