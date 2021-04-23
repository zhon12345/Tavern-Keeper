/* eslint-disable no-unused-vars */
const { BOT_TOKEN } = process.env;

module.exports = {
	name: 'restart',
	category: 'Owner',
	description: 'Restarts the bot.',
	aliases: ['reload'],
	usage: 'restart',
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		message.channel.send('⚙ Restarting...').then(msg => msg.delete({ timeout: 300 }))
			.then(() => client.destroy())
			.then(() => client.login(BOT_TOKEN))
			.then(() => message.channel.send('`✔️` Restart Successful'));
	},
};