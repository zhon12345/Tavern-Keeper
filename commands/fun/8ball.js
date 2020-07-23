const responses = require('../../assets/json/8ball.json');

module.exports = {
	name: '8ball',
	category: 'Fun',
	description: 'Ask the magic 8-ball for an answer.',
	aliases: ['ask'],
	usage: '8ball <question>',
	guildOnly: true,
	run: async (client, message, args) => {
		const question = args[0];
		if (!question) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid question!',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const response = responses[Math.floor(Math.random() * responses.length - 1)];
		message.channel.send(`${response}`);
	},
};