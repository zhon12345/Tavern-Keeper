const dictionary = require("../../assets/json/emojify.json");

module.exports = {
	name: "emojify",
	category: "Fun",
	description: "Changes text into emojis",
	aliases: [],
	usage: "emojify <text>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text (eg. `Hello`).",
			);
		}

		if(text.length > 1024) {
			return message.channel.send(
				"`❌` You have exceeded the 1024 characters limit.",
			);
		}

		const emojified = text.toLowerCase().split("").map(letter => {
			return dictionary[letter] || letter;
		}).join(" ");

		message.channel.send(emojified);
	},
};