const { MessageAttachment } = require("discord.js");
const token = process.env.ALEXFLIPNOTE_API_TOKEN;
const fetch = require("node-fetch");

module.exports = {
	name: "supreme",
	category: "Image",
	description: "Make a supreme logo with the text of your choice.",
	aliases: [],
	usage: "supreme <text>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				"<:vError:725270799124004934> Text not found, please provide valid text. (eg. `Hello`)",
			);
		}

		const url = `https://api.alexflipnote.dev/supreme?text=${args.join("%20")}`;

		let response;
		try {
			response = await fetch(url, { headers: {
				"Authorization" : token,
			} }).then(res => res.buffer());
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}

		const attachment = new MessageAttachment(response, "supreme.png");
		message.channel.send(attachment);
	},
};
