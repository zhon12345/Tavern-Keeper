const { BOT_PREFIX, BOT_VERSION, BOT_DB } = process.env;
const mongoose = require('mongoose');

module.exports = (client) =>{
	mongoose.connect(BOT_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	client.user.setActivity(`${BOT_PREFIX}help | ${client.commands.size} Commands`, { type: 'PLAYING' });
	console.log(`Connected to MongoDB as ${client.user.tag}`);
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Version:', BOT_VERSION);
	console.log('Prefix:', BOT_PREFIX);
};