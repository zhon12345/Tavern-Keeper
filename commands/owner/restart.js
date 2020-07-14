/* eslint-disable no-unused-vars */
const { ownerid, token, prefix } = process.env;

module.exports = {
	name: 'restart',
	category: 'Owner',
	description: 'Restarts the bot.',
	aliases: ['reload'],
	usage: 'restart',
	run: async (client, message, args) => {
		if(message.author.id !== ownerid) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else{
			try {
				message.channel.send('Restarting...').then(msg => msg.delete({ timeout: 300 }))
					.then(() => client.destroy())
					.then(() => client.login(token))
					.then(() => client.user.setActivity(`${prefix}help | ${client.commands.size} Commands`, { type: 'PLAYING' }))
					.then(() => message.channel.send('Restart Successful'));
			}
			catch(e) {
				message.channel.send(`ERROR: ${e.message}`);
			}
		}

	},
};