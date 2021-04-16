const { MessageAttachment } = require("discord.js");
const token = process.env.ALEXFLIPNOTE_API_TOKEN;
const fetch = require("node-fetch");

module.exports = {
	name: "achi",
	category: "Image",
	description: "Get a personalized minecraft achievement.",
	aliases: ["achievement"],
	usage: "achi <text>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
		const tips = [
			"Dont forget milk good for you!",
			"2.2 when?",
			"There is a lot of random 'tips' on this cmd.",
			"Keep your diamond it's usefull!",
			"Minecraft or geometry dash?",
			"Easy to make right?",
			":)",
			" You can make whatever you want with the achivement command." ];

		const tip = tips[Math.floor(Math.random() * tips.length)];


		const min = 1;
		const max = 35;

		const logo = Math.floor(Math.random() * (+max - +min)) + +min;

		const achi = args.slice().join("+");
		if(!achi) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid text.",
			);
		}
		if (achi.length >= 24) {
			return message.channel.send(
				"<:vWarning:725276167346585681> You have exceeded the character limit.",
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
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}

		const attachment = new MessageAttachment(response, "achivement.png");
		message.channel.send(tip, attachment);
	},
};