const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "clyde",
	category: "Image",
	description: "Make Clyde say something.",
	aliases: [],
	usage: "clyde <text>",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send("`❌` Text not found, please provide valid text. (eg. `Hello`)");
		}

		const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

		let response;
		try {
			response = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const attachment = new MessageAttachment(response.message, "clyde.png");
		return message.channel.send(attachment);
	},
};
