const dictionary = require("../../assets/json/vaporwave.json");

module.exports = {
	name: "vaporwave",
	aliases: ["aesthetic"],
	description: "Converts text into ｖａｐｏｒｗａｖｅ.",
	usage: "vaporwave <text>",
	category: "Fun",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!args[0]) {
			return message.channel.send(
				"<:vError:725270799124004934> Text not found, please provide valid text. (eg. `Hello`)",
			);
		}

		if(text.length > 2000) {
			return message.channel.send("<:vError:725270799124004934> The provided message exceeds 2000 characters.");
		}

		const vapour = text.split("").map(letter => {
			return dictionary[letter] || letter;
		}).join("");

		message.channel.send(vapour);
	},
};