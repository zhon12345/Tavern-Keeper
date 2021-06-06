const dictionary = require("../../assets/json/vaporwave.json");

module.exports = {
	name: "vaporwave",
	aliases: ["aesthetic"],
	description: "Converts text into ｖａｐｏｒｗａｖｅ.",
	usage: "vaporwave <text>",
	category: "Fun",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!args[0]) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text. (eg. `Hello`)",
			);
		}

		if(text.length > 1024) {
			return message.channel.send(
				"`❌` You have exceeded the 1024 characters limit.",
			);
		}

		const vapour = text.split("").map(letter => {
			return dictionary[letter] || letter;
		}).join("");

		message.channel.send(vapour);
	},
};