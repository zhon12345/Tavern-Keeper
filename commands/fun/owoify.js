const fetch = require("node-fetch");

module.exports = {
	name: "owoify",
	category: "Fun",
	description: "OwOify a provided text.",
	aliases: [],
	usage: "owoify <text>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send("`❌` Text not found, please provide valid text. (eg. `Hello`)");
		}
		if (text.length > 200) {
			return message.channel.send("`❌` You have exceeded the 200 characters limit.");
		}

		const url = `https://nekos.life/api/v2/owoify?text=${encodeURIComponent(text)}`;

		let response;
		try {
			response = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		message.channel.send(response.owo);
	},
};
