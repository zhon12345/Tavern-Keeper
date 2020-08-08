const Guild = require('../../models/guild');

module.exports = {
	name: 'spoiler',
	category: 'Fun',
	description: 'Make the bot say whatever you want in annoying spoiler form.',
	aliases: [],
	usage: 'soiler <text>',
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const prefix = settings.prefix;

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