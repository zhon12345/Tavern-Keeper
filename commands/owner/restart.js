/* eslint-disable no-unused-vars */
const { BOT_OWNER, BOT_TOKEN, BOT_PREFIX } = process.env;

module.exports = {
	name: 'restart',
	category: 'Owner',
	description: 'Restarts the bot.',
	aliases: ['reload'],
	usage: 'restart',
	run: async (client, message, args) => {
		if (message.author.id !== BOT_OWNER) {
			return;
		}

		try {
			message.channel.send('Restarting...').then(msg => msg.delete({ timeout: 300 }))
				.then(() => client.destroy())
				.then(() => client.login(BOT_TOKEN))
				.then(() => client.user.setActivity(`${BOT_PREFIX}help | ${client.commands.size} Commands`, { type: 'PLAYING' }))
				.then(() => message.channel.send('Restart Successful'));
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
	},
};