const { BOT_PREFIX, BOT_VERSION, BOT_DB } = process.env;
const mongoose = require('mongoose');

module.exports = async (client) =>{
	mongoose.connect(BOT_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const botStatus = [
		`${client.commands.size} Commands`,
		`${client.users.cache.size} Users`,
		`${client.guilds.cache.size} Servers`,
	];

	setInterval(function() {
		const status = botStatus[Math.floor(Math.random() * botStatus.length)];
		client.user.setActivity(`${BOT_PREFIX}help | ${status}`, { type: 'PLAYING' });
	}, 30000);
	console.log('Connected to MongoDB');
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Version:', BOT_VERSION);
	console.log('Prefix:', BOT_PREFIX);
};