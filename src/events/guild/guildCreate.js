const db = require('quick.db');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = async (client, guild) => {
	guild = new Guild({
		_id: mongoose.Types.ObjectId(),
		guildID: guild.id,
		guildName: guild.name,
		prefix: process.env.BOT_PREFIX,
		modlog: null,
		serverlog: null,
		messagelog: null,
		antilinks: false,
	});

	guild.save();

	if(db.has('blacklist', guild.id)) {
		guild.leave(guild.id);
	}
};