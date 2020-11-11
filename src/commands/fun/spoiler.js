module.exports = {
	name: 'spoiler',
	category: 'Fun',
	description: 'Make the bot say whatever you want in annoying spoiler form.',
	aliases: [],
	usage: 'soiler <text>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		message.channel.send(`||${args.join(' ').split('').join('||||')}||`);
	},
};