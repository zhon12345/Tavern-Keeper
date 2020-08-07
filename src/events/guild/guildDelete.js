/* eslint-disable no-unused-vars */
const Guild = require('../../models/guild');

module.exports = async (client, guild) => {
	Guild.deleteOne({
		guildID: guild.id,
	}, (err, res) => {
		if(err) console.error(err);
		console.log('I have been removed from a server!');
	});
};