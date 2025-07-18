const fetch = require("node-fetch");
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "changemymind",
	category: "Image",
	description: "Make your own changemymind meme",
	aliases: [],
	usage: "changemymind <text>",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send("`❌` Text not found, please provide valid text. (eg. `English > Maths`)");
		}

		const url = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`;

		let response;
		try {
			response = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const attachment = new MessageAttachment(response.message, "changemymind.png");
		return message.channel.send(attachment);
	},
};
