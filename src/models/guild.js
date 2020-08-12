const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	guildID: String,
	guildName: String,
	prefix: String,
	blacklisted: Boolean,
	settings: {
		id: mongoose.Schema.Types.ObjectId,
		antilinks: Boolean,
		muterole: String,
		verifyrole: String,
		modlog: String,
		serverlog: String,
		messagelog: String,
	},
	welcomer: {
		id: mongoose.Schema.Types.ObjectId,
		joinchannel: String,
		leavechannel: String,
		jointext: String,
		leavetext: String,
	},
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');