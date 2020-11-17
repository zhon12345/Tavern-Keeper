const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = async (client, guild) => {
	guild = new Guild({
		_id: mongoose.Types.ObjectId(),
		guildID: guild.id,
		guildName: guild.name,
		prefix: process.env.BOT_PREFIX,
		settings:{
			id: mongoose.Types.ObjectId(),
			antiprofanity: false,
			antilinks: false,
			muterole: null,
			memberrole: null,
			modlog: null,
			serverlog: null,
			messagelog: null,
		},
	});

	guild.save();
};