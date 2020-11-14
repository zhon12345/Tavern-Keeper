const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	guildID: String,
	guildName: String,
	prefix: String,
	blacklisted: Boolean,
	settings: {
		id: mongoose.Schema.Types.ObjectId,
		antiprofanity: Boolean,
		antilinks: Boolean,
		muterole: String,
		memberrole: String,
		modlog: String,
		serverlog: String,
		messagelog: String,
	},
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');