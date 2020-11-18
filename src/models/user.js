const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	guildName: String,
	username: String,
	guildID: String,
	userID: String,
	warnings: [
		{
			code: String,
			moderator: String,
			moderatorID: String,
			timestamp: Date,
			reason: String,
		},
	],
});

module.exports = mongoose.model('User', userSchema, 'users');