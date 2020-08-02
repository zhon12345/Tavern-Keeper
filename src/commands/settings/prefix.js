const db = require('quick.db');
const prefix = process.env.BOT_PREFIX;

module.exports = {
	name: 'setprefix',
	category: 'Settings',
	description: 'Change the bot\'s prefix for the server.',
	aliases: ['prefix'],
	usage: 'setprefix <prefix>',
	guildOnly: true,
	run: (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}
		if(!args[0]) {
			return message.channel.send('<:vError:725270799124004934> Please provide a valid prefix.');
		}

		if(args[0] === db.fetch(`prefix_${message.guild.id}`)) {
			return message.channel.send('<:vWarning:725276167346585681> That prefix is already in use.');
		}

		if(args[0].length > 3) {
			return message.channel.send('<:vError:725270799124004934> Prefixes are not allowed to be more than 3 characters');
		}

		if(args.join('') === prefix) {
			db.delete(`prefix_${message.guild.id}`);
			return message.channel.send('<:vSuccess:725270799098970112> My Prefix has been reset.');
		}
		else {db.set(`prefix_${message.guild.id}`, args[0]);}
		message.channel.send(
			`<:vSuccess:725270799098970112> My prefix has been set to \`${args[0]}\``,
		).then(message.delete());
	},
};