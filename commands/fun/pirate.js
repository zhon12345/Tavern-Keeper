const fetch = require("node-fetch");

module.exports = {
	name: "pirate",
	category: "Fun",
	description: "Converts a specified text into pirate text.",
	aliases: [],
	usage: "pirate <message>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Text not found, please provide valid text. (eg. `Hello`)",
			);
		}
		const url = `https://api.funtranslations.com/translate/pirate.json?text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}
		message.channel.send(response.contents.translated);
	},
};