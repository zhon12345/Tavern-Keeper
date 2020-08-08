/* eslint-disable no-unused-vars */
const Guild = require('../../models/guild');

module.exports = async (client, guild) => {
	Guild.deleteOne({
		guildID: guild.id,
	});
};