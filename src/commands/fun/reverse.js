const Guild = require('../../models/guild');

module.exports = {
	name: 'reverse',
	category: 'Fun',
	description: 'esreveR specified text.',
	aliases: [],
	usage: 'reverse <message>',
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const prefix = settings.prefix;

		const text = message.content.substring(prefix.length + 8).split('').reverse().join('');
		if(!args.slice().join(' ')) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		message.channel.send(`${text}`);
	},
};