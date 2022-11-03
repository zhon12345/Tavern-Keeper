const { MessageAttachment } = require("discord.js");
const token = process.env.ALEXFLIPNOTE_API_TOKEN;
const fetch = require("node-fetch");

module.exports = {
	name: "drake",
	category: "Image",
	description: "Make a drake meme!",
	aliases: [],
	usage: "drake <text> | <text>",
	disabled: true,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		let text1 = args.join(" ").split(" |")[0];
		let text2 = args.join(" ").split("| ")[1];

		if (!text1 || !text2) {
			text1 = "not providing any text";
			text2 = "actually providing text";
		}

		const url = `https://api.alexflipnote.dev/drake?top=${encodeURIComponent(text1)}&bottom=${encodeURIComponent(text2)}`;

		let response;
		try {
			response = await fetch(url, { headers: {
				"Authorization" : token,
			} }).then(res => res.buffer());
		}
		catch (e) {
			return message.channel.send(
				"`❌` An error occurred, please try again!",
			);
		}

		const attachment = new MessageAttachment(response, "drake.png");
		message.channel.send(attachment);
	},
};