const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "device",
	category: "Info",
	description: "Tells you which devices a user is on.",
	aliases: [],
	usage: "device <member>",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.members.cache.find(
				(x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0],
			) ||
			message.member;

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(`${member.user.username}'s device`)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp()
			.addFields([
				{
					name: "📱 Mobile",
					value: member.presence.clientStatus
						? member.presence.clientStatus.mobile
							? "<:online:745651877382717560>"
							: "<:offline:745651876552376402>"
						: "<:offline:745651876552376402>",
					inline: true,
				},
				{
					name: "🖥 Desktop",
					value: member.presence.clientStatus
						? member.presence.clientStatus.desktop
							? "<:online:745651877382717560>"
							: "<:offline:745651876552376402>"
						: "<:offline:745651876552376402>",
					inline: true,
				},
				{
					name: "🌐 Web",
					value: member.presence.clientStatus
						? member.presence.clientStatus.web
							? "<:online:745651877382717560>"
							: "<:offline:745651876552376402>"
						: "<:offline:745651876552376402>",
					inline: true,
				},
			]);
		return message.channel.send(embed);
	},
};
