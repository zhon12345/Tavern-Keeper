const responses = require("../../assets/json/8ball.json");

module.exports = {
	name: "8ball",
	category: "Fun",
	description: "Ask the magic 8-ball for an answer.",
	aliases: ["ask"],
	usage: "8ball <question>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const question = args[0];
		if (!question) {
			return message.channel.send(
				"`❌` Question not found, please provide a valid question! (eg. Should I go to sleep?`)",
			);
		}
		const response = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send(`${response}`);
	},
};