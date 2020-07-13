const { prefix, version } = process.env;

module.exports = (client) =>{
	client.user.setActivity(`${prefix}help`, { type: 'STREAMING', url: 'https://www.twitch.tv/zhon12345' });
	console.log(`Logged in as ${client.user.tag}`);
	console.log('Version:', version);
	console.log('Prefix:', prefix);
};