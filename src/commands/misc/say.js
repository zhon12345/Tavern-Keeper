module.exports = {
	name: 'say',
	category: 'Misc',
	description: 'Make the bot say whatever you want.',
	aliases: [],
	usage: 'say <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}
		message.channel.send(text);
	},
};