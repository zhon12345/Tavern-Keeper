const fetch = require("node-fetch");
const token = process.env.AMETHYSTE_API_TOKEN;
const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "jail",
	category: "Image",
	description: "Send your friends to jail!",
	aliases: [],
	usage: "jail [user]",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
		const url = "https://v1.api.amethyste.moe/generate/jail";
		const data = `url=${member.user.displayAvatarURL({ format: "png" })}`;

		let response;
		try {
			response = await fetch(url, { method: "POST", body: data, headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"authorization": `Bearer ${token}`,
			} }).then(res => res.buffer());
		}
		catch (e) {
			return message.channel.send("<:vError:725270799124004934> An error occurred, please try again!");
		}
		const attachment = new MessageAttachment(response, "blurpify.png");
		return message.channel.send(attachment);
	},
};