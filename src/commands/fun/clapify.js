const db = require('quick.db');

module.exports = {
	name: 'clapify',
	category: 'Fun',
	description: 'Generate clapified 👏 text 👏',
	aliases: [],
	usage: 'clapify <text>',
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
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		let text;
		const txt = args.join(' ');
		if(/\s/.test(txt)) {
			text = args.join(' 👏 ');
		}
		else {
			text = message.content.substring(prefix.length + 8).split('').join(' 👏 ');
		}
		message.channel.send(`${text} 👏`);
	},
};