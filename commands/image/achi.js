const { MessageAttachment } = require("discord.js");
const token = process.env.ALEXFLIPNOTE_API_TOKEN;
const fetch = require("node-fetch");

module.exports = {
	name: "achi",
	category: "Image",
	description: "Get a personalized minecraft achievement.",
	aliases: ["achievement"],
	usage: "achi <text>",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
		const tips = [
			"Don't forget milk good for you!",
			"2.2 when?",
			"There is a lot of random 'tips' on this cmd.",
			"Keep your diamonds it's useful!",
			"Minecraft or geometry dash?",
			"Easy to make right?",
			":)",
			" You can make whatever you want with the achievement command." ];

		const tip = tips[Math.floor(Math.random() * tips.length)];


		const min = 1;
		const max = 35;

		const logo = Math.floor(Math.random() * (+max - +min)) + +min;

		const achi = args.slice().join("+");
		if(!achi) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text. (eg. `Hello`)",
			);
		}
		if (achi.length > 30) {
			return message.channel.send(
				"`❌` You have exceeded the 30 characters limit.",
			);
		}

		const url = `https://api.alexflipnote.dev/achievement?text=${achi}&icon=${logo}`;

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

		const attachment = new MessageAttachment(response, "achievement.png");
		message.channel.send(tip, attachment);
	},
};