const texts = require("../../assets/json/kill.json");
const { BOT_OWNER } = process.env;

module.exports = {
	name: "kill",
	category: "Fun",
	description: "Sick of someone? Easy! Just kill them! (virtually)",
	aliases: [],
	usage: "kill <user>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		if (message.author.id !== BOT_OWNER) return;

		const user =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.members.cache.find(
				(x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0],
			) ||
			message.member;
		if (user.id === BOT_OWNER) {
			return message.channel.send(
				`${message.author.username} has been brutally demolished by ${client.users.cache.get(BOT_OWNER).username}'s bodyguards.`,
			);
		}
		const randomAnswer = texts[Math.floor(Math.random() * texts.length)];
		const text = randomAnswer
			.split("{user}")
			.join(`${user.user.username}`)
			.split("{author}")
			.join(`${message.author.username}`);
		message.channel.send(text);
	},
};
