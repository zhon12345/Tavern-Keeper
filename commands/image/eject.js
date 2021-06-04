const { MessageAttachment } = require("discord.js");

const colors = [
	"black",
	"blue",
	"brown",
	"cyan",
	"darkgreen",
	"lime",
	"orange",
	"pink",
	"purple",
	"red",
	"white",
	"yellow",
];

module.exports = {
	name: "eject",
	category: "Fun",
	description: "Are they the imposter? They seem kinda sus.",
	aliases: [],
	usage: "eject <user>",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS", "ATTACH_FILES"],
	run: async (client, message, args) => {
		const color = colors[Math.floor(Math.random() * colors.length)];
		const isimpostor = ["true", "false"][Math.floor(Math.random() * 2)];
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				"`❌` User not found, please provide valid user. (eg. `@zhon12345#8585`)",
			);
		}

		const image = `https://vacefron.nl/api/ejected?name=${member.user.username}&impostor=${isimpostor}&crewmate=${color}`;
		const attachment = new MessageAttachment(image, "eject.png");
		message.channel.send(attachment);
	},
};