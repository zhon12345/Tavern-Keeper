const Guild = require('../../models/guild');

module.exports = {
	name: 'clapify',
	category: 'Fun',
	description: 'Generate clapified 👏 text 👏',
	aliases: [],
	usage: 'clapify <text>',
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		}, (err) => {
			if (err) console.error(err);
		});
		const prefix = settings.prefix;

		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
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