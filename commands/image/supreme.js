const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "supreme",
	category: "Image",
	description: "Make a supreme logo with the text of your choice.",
	aliases: [],
	usage: "supreme <text>",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const text = args.join(" ");
		if (!text) {
			return message.channel.send("`❌` Text not found, please provide valid text. (eg. `Hello`)");
		}

		const url = new URL("https://api.alexflipnote.dev/supreme");
		url.searchParams.append("text", text);

		let response;
		try {
			response = await fetch(url.toString()).then((res) => res.buffer());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		const attachment = new MessageAttachment(response, "supreme.png");
		message.channel.send(attachment);
	},
};
