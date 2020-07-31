const db = require('quick.db');

module.exports = {
	name: 'reverse',
	category: 'Fun',
	description: 'esreveR specified text.',
	aliases: [],
	usage: 'reverse <message>',
	run: async (client, message, args) => {
		let prefix;
		const prefixes = db.fetch(`prefix_${message.guild.id}`);
		if(prefixes == null) {
			prefix = process.env.BOT_PREFIX;
		}
		else {
			prefix = prefixes;
		}
		const text = message.content.substring(prefix.length + 8).split('').reverse().join('');
		if(!args.slice().join(' ')) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		message.channel.send(`${text}`);
	},
};