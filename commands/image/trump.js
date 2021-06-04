const fetch = require("node-fetch");
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "trump",
	category: "Image",
	description: "Make trump tweet something.",
	aliases: [],
	usage: "trump <text>",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text.",
			);
		}

		const url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const attachment = new MessageAttachment(response.message, "trump.png");
		return message.channel.send(attachment);
	},
};