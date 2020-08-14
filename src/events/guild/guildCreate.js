const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports = async (client, guild) => {
	guild = new Guild({
		_id: mongoose.Types.ObjectId(),
		guildID: guild.id,
		guildName: guild.name,
		prefix: process.env.BOT_PREFIX,
		blacklisted: false,
		settings:{
			id: mongoose.Types.ObjectId(),
			antilinks: false,
			muterole: null,
			verifyrole: null,
			modlog: null,
			serverlog: null,
			messagelog: null,
		},
		welcomer: {
			id: mongoose.Types.ObjectId(),
			joinchannel: null,
			leavechannel: null,
			jointext: null,
			leavetext: null,
		},
	});

	guild.save();
};