const db = require('quick.db');

module.exports = async (client, guild) => {
	if(db.has('blacklist', guild.id)) {
		guild.leave(guild.id);
	}
};