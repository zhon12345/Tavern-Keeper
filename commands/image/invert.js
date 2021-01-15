const { MessageAttachment } = require("discord.js");
const token = process.env.ALEXFLIPNOTE_API_TOKEN;
const fetch = require("node-fetch");

module.exports = {
	name: "invert",
	category: "Image",
	description: "Invert the colors of a user's avatar.",
	aliases: ["colorfilp"],
	usage: "invert <user>",
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;

		const url = `https://api.alexflipnote.dev/filter/invert?image=${member.user.displayAvatarURL({ format: "png" })}`;

		let response;
		try {
			response = await fetch(url, { headers: {
				"Authorization" : token,
			} });
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}

		const attachment = new MessageAttachment(response, "invert.png");
		message.channel.send(attachment);
	},
};