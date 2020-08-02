const db = require('quick.db');

module.exports = {
	name: 'spoiler',
	category: 'Fun',
	description: 'Make the bot say whatever you want in annoying spoiler form.',
	aliases: [],
	usage: 'soiler <text>',
	run: async (client, message, args) => {
		let prefix;
		const prefixes = db.fetch(`prefix_${message.guild.id}`);
		if(prefixes == null) {
			prefix = process.env.BOT_PREFIX;
		}
		else {
			prefix = prefixes;
		}
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}
		else {
			message.channel.send(`||${message.content.substring(prefix.length + 8).split('').join('||||')}||`);
		}
	},
};