const fetch = require("node-fetch");
const token = process.env.AMETHYSTE_API_TOKEN;
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "batslap",
	category: "Image",
	description: "Batslap a specified user.",
	aliases: [],
	usage: "batslap <user>",
	disabled: false,
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
		const url = "https://v1.api.amethyste.moe/generate/batslap";
		const data = `avatar=${message.author.displayAvatarURL({ format: "png" })}&url=${member.user.displayAvatarURL({ format: "png" })}`;

		let response;
		try {
			response = await fetch(url, {
				method: "POST",
				body: data,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					authorization: `Bearer ${token}`,
				},
			}).then((res) => res.buffer());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const attachment = new MessageAttachment(response, "batslap.png");
		return message.channel.send(attachment);
	},
};
