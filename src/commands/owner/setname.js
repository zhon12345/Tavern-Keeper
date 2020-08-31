module.exports = {
	name: 'setname',
	description: 'Changes the bot\'s name',
	category: 'Owner',
	usage: 'setname <name>',
	run: async (client, message, args) => {
		const name = args.join(' ');
		try {
			client.user.setUsername(name);
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		message.channel.send(
			`<:vSuccess:725270799098970112> Successfully changed my username to **${name}**`,
		);
	},
};