const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "achi",
	category: "Image",
	description: "Get a personalized minecraft achievement.",
	aliases: ["achievement"],
	usage: "achi <text>",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const tips = [
			"Don't forget, milk is good for you!",
			"2.2 when?",
			"There is a lot of random 'tips' in this cmd.",
			"Keep your diamonds; they're useful!",
			"Minecraft or Geometry Dash?",
			"Easy, right?",
			":)",
			"You can make whatever you want with the achievement command.",
		];

		const tip = tips[Math.floor(Math.random() * tips.length)];

		const achi = args.join(" ");
		if (!achi) {
			return message.channel.send("`❌` Text not found, please provide valid text. (eg. `Hello`)");
		}

		const url = new URL("https://api.alexflipnote.dev/achievement");
		url.searchParams.append("text", achi);

		let response;
		try {
			response = await fetch(url.toString()).then((res) => res.buffer());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		const attachment = new MessageAttachment(response, "achievement.png");
		message.channel.send(tip, attachment);
	},
};
