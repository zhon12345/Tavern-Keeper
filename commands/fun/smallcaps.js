const dictionary = require("../../assets/json/smallcaps.json");

module.exports = {
	name: "smallcaps",
	description: "Converts text into sᴍᴀʟʟᴄᴀᴘs.",
	aliases: [],
	usage: "smallcaps <text>",
	category: "Fun",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid text.",
			);
		}

		if(text.length > 2000) {
			return message.channel.send("<:vError:725270799124004934> The provided message exceeds 2000 characters.");
		}

		const smallcaps = text.toLowerCase().split("").map(letter => {
			return dictionary[letter] || letter;
		}).join("");

		message.channel.send(smallcaps);
	},
};