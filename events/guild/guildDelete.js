const Guild = require("../../models/guild");

module.exports = async (client, guild) => {
	await Guild.deleteOne({
		guildID: guild.id,
	});
};
