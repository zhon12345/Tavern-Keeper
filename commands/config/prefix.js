const db = require('quick.db');
const prefix = process.env.prefix;

module.exports = {
	name: 'setprefix',
	category: 'Config',
	description: 'Change the bot\'s prefix for the server.',
	aliases: ['prefix'],
	usage: 'setprefix <prefix>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		if(!args[0]) {
			return message.channel.send('You did not specify a prefix.');
		}

		if(args[0] === db.fetch(`prefix_${message.guild.id}`)) {
			return message.channel.send('That prefix is already in use.');
		}

		if(args[0].length > 3) {
			return message.channel.send('Prefix are not allowed to be more than 3 characters');
		}

		if(args.join('') === prefix) {
			db.delete(`prefix_${message.guild.id}`);
			return message.channel.send('My Prefix has been reset.');
		}
		else {db.set(`prefix_${message.guild.id}`, args[0]);}
		message.channel.send(`My Prefix has been set to ${args[0]}`);
	},
};