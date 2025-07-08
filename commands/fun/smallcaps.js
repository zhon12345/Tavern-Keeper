const dictionary = require("../../assets/json/smallcaps.json");

module.exports = {
	name: "smallcaps",
	description: "Converts text into sᴍᴀʟʟᴄᴀᴘs.",
	aliases: [],
	usage: "smallcaps <text>",
	category: "Fun",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send("`❌` Text not found, please provide valid text. (eg. `Hello`)");
		}

		if (text.length > 1024) {
			return message.channel.send("`❌` You have exceeded the 1024 characters limit.");
		}

		const smallcaps = text
			.toLowerCase()
			.split("")
			.map((letter) => {
				return dictionary[letter] || letter;
			})
			.join("");

		message.channel.send(smallcaps);
	},
};
