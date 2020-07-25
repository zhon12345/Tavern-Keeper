const { BOT_PREFIX, BOT_VERSION } = process.env;

module.exports = (client) =>{
	client.user.setActivity(`${BOT_PREFIX}help | ${client.commands.size} Commands`, { type: 'PLAYING' });
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Version:', BOT_VERSION);
	console.log('Prefix:', BOT_PREFIX);
};