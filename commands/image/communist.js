const { MessageAttachment } = require("discord.js");
const token = process.env.ALEXFLIPNOTE_API_TOKEN;
const fetch = require("node-fetch");

module.exports = {
	name: "communist",
	category: "Image",
	description: "Embrace your inner communist!",
	aliases: ["communism"],
	usage: "communist <user>",
	disabled: true,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

		const url = `https://api.alexflipnote.dev/filter/communist?image=${member.user.displayAvatarURL({ format: "png" })}`;

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

		const attachment = new MessageAttachment(response, "communist.png");
		message.channel.send(attachment);
	},
};