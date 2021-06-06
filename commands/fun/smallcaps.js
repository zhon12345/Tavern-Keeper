const dictionary = require("../../assets/json/smallcaps.json");

module.exports = {
	name: "smallcaps",
	description: "Converts text into sᴍᴀʟʟᴄᴀᴘs.",
	aliases: [],
	usage: "smallcaps <text>",
	category: "Fun",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text. (eg. `Hello`)",
			);
		}

		if(text.length > 1024) {
			return message.channel.send("`❌` The provided message exceeds 1024 characters.");
		}

		const smallcaps = text.toLowerCase().split("").map(letter => {
			return dictionary[letter] || letter;
		}).join("");

		message.channel.send(smallcaps);
	},
};