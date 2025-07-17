const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "drake",
	category: "Image",
	description: "Make a drake meme!",
	aliases: [],
	usage: "drake <text> | <text>",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const input = args.join(" ").split("|");

		let text1 = input[0] ? input[0].trim() : "";
		let text2 = input[1] ? input[1].trim() : "";

		if (!text1 || !text2) {
			text1 = "not providing any text";
			text2 = "actually providing text";
		}

		const url = new URL("https://api.alexflipnote.dev/drake");
		const params = new URLSearchParams({
			top: text1,
			bottom: text2,
		});

		url.search = params.toString();

		let response;
		try {
			response = await fetch(url.toString()).then((res) => res.buffer());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		const attachment = new MessageAttachment(response, "drake.png");
		message.channel.send(attachment);
	},
};
