const dictionary = require("../../assets/json/emojify.json");

module.exports = {
	name: "emojify",
	category: "Fun",
	description: "Changes text into emojis",
	aliases: [],
	usage: "emojify <text>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Text not found, please provide valid text (eg. `Hello`).",
			);
		}

		if(text.length > 2000) {
			return message.channel.send("<:vError:725270799124004934> The provided message exceeds 2000 characters.");
		}

		const emojified = text.toLowerCase().split("").map(letter => {
			return dictionary[letter] || letter;
		}).join(" ");

		message.channel.send(emojified);
	},
};