const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "clyde",
	category: "Image",
	description: "Make Clyde say something.",
	aliases: [],
	usage: "clyde <text>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid text.",
			);
		}

		const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
		}
		const attachment = new MessageAttachment(response.message, "clyde.png");
		return message.channel.send(attachment);
	},
};