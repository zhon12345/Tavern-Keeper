const fetch = require("node-fetch");
const { MessageAttachment } = require("discord.js");
const token = process.env.AMETHYSTE_API_TOKEN;

module.exports = {
	name: "tobecontinued",
	category: "Image",
	description: "To be continued...",
	aliases: [],
	usage: "tobecontinued [user]",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
		const url = "https://v1.api.amethyste.moe/generate/tobecontinued";
		const data = `url=${member.user.displayAvatarURL({ format: "png" })}`;

		let response;
		try {
			response = await fetch(url, { method: "POST", body: data, headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"authorization": `Bearer ${token}`,
			} }).then(res => res.buffer());
		}
		catch (e) {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const attachment = new MessageAttachment(response, "tobecontinued.png");
		return message.channel.send(attachment);
	},
};