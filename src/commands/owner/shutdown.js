/* eslint-disable no-unused-vars */
const { BOT_OWNER } = process.env;

module.exports = {
	name: 'shutdown',
	category: 'Owner',
	description: 'Shutdown the bot.',
	aliases: ['reload'],
	usage: 'restart',
	run: async (client, message, args) => {
		if (message.author.id !== BOT_OWNER) {
			return;
		}

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