const { MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "invert",
	category: "Image",
	description: "Invert the colors of a user's avatar.",
	aliases: ["colorfilp"],
	usage: "invert <user>",
	disabled: true,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.members.cache.find(
				(x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0],
			) ||
			message.member;

		const url = `https://api.alexflipnote.dev/filter/invert?image=${member.user.displayAvatarURL({ format: "png" })}`;

		let response;
		try {
			response = await fetch(url).then((res) => res.buffer());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		const attachment = new MessageAttachment(response, "invert.png");
		message.channel.send(attachment);
	},
};
