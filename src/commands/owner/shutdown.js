/* eslint-disable no-unused-vars */
module.exports = {
	name: 'shutdown',
	category: 'Owner',
	description: 'Shutdown the bot.',
	aliases: [],
	usage: 'shutdown',
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		try {
			message.channel.send('⚙ Shutting down...')
				.then(() => process.exit());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
	},
};