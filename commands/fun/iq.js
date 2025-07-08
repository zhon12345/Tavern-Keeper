const { MessageEmbed } = require("discord.js");
const { BOT_OWNER } = process.env;

module.exports = {
	name: "iq",
	category: "Fun",
	description: " ̶ R̶a̶n̶d̶o̶m̶i̶s̶e̶  Calculate your IQ..",
	aliases: [],
	usage: "iq",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.members.cache.find(
				(x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0],
			) ||
			message.member;

		let love;
		if (member.id === BOT_OWNER) {
			love = "130";
		} else {
			love = Math.floor(Math.random() * 130) + 1;
		}

		return message.channel.send("⚙️ Calculating...").then((msg) => {
			const Embed = new MessageEmbed()
				.setTitle(`🧠 ${member.user.username}'s IQ:`)
				.setColor("BLUE")
				.setDescription(`${love}!`);
			msg.edit(Embed);
		});
	},
};
