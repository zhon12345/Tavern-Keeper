const { prefix, version } = process.env;

module.exports = (client) =>{
	client.user.setActivity(`${prefix}help`, { type: 'PLAYING' });
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Version:', version);
	console.log('Prefix:', prefix);
};