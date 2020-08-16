module.exports = {
	name: 'spoiler',
	category: 'Fun',
	description: 'Make the bot say whatever you want in annoying spoiler form.',
	aliases: [],
	usage: 'soiler <text>',
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}
		else {
			message.channel.send(`||${args.join(' ').split('').join('||||')}||`);
		}
	},
};