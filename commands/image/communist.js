const { MessageAttachment } = require("discord.js");

module.exports = {
	name: "communist",
	category: "Image",
	description: "Embrace your inner communist!",
	aliases: ["communism"],
	usage: "communist <user>",
	run: async (client, message, args) => {
		if(!message.guild.me.hasPermission("ATTACH_FILES")) {
			return message.channel.send(
				"<:vError:725270799124004934> Insufficient Permission! `ATTACH_FILES` required.",
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
		const image = `https://api.alexflipnote.dev/filter/communist?image=${member.user.displayAvatarURL({ format: "png" })}`;
		const attachment = new MessageAttachment(image, "communist.png");
		message.channel.send(attachment);
	},
};