module.exports = {
	name: 'say',
	category: 'Owner',
	description: 'Make the bot say whatever you want.',
	aliases: ['imitate'],
	usage: 'say <text>',
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'`❌` Please provide valid text.',
			);
		}
		message.channel.send(text);
	},
};