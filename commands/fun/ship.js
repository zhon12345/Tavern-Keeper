const { MessageEmbed } = require("discord.js");
const { BOT_OWNER } = process.env;

module.exports = {
	name: "ship",
	category: "Fun",
	description: "Get the compatibility rate of a two users.",
	aliases: [],
	usage: "ship <user> | <user>",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		let rating = Math.floor(Math.random() * 100) + 1;
		const meter = ["▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬", "▬"];
		const hearts = {
			0: "❤️",
			1: "🧡",
			2: "💛",
			3: "💚",
			4: "💙",
			5: "💜",
		};

		const member1 = message.mentions.members.size === 2 ? message.mentions.members.first() : message.guild.members.cache.get(args.join(" ").split(" | ")[0]) || message.guild.members.cache.find(x => x.user.username === args.join(" ").split(" | ")[0] || x.user.username === args.join(" ").split(" | ")[0]);
		if (!member1) {
			return message.channel.send("`❌` User not found, please provide valid 1st user. (eg. `@zhon12345#8585 | @zhon12345#8585`)");
		}

		const member2 = message.mentions.members.size === 2 && args[1] === "|" ? message.mentions.members.last() : message.guild.members.cache.get(args.join(" ").split(" | ")[1]) || message.guild.members.cache.find(x => x.user.username === args.join(" ").split(" | ")[1] || x.user.username === args.join(" ").split(" | ")[1]);
		if (!member2) {
			return message.channel.send("`❌` User not found, please provide valid 2nd user. (eg. `@zhon12345#8585 | @zhon12345#8585`)");
		}

		const shipName = member1.user.username.substr(0, member1.user.username.length * 0.5) + member2.user.username.substr(member2.user.username.length * 0.5);

		if (shipName === client.users.cache.get(BOT_OWNER).username) {
			rating = "100";
		}

		let pos = 0;
		let under = 9;
		while (pos < 10) {
			if (rating < under) {
				meter.splice(pos, 0, hearts[Math.floor(Math.random() * 5)]);
				break;
			}
			pos++;
			under += 10;
		}

		if (rating >= 99) {
			meter.splice(9, 0, hearts[Math.floor(Math.random() * 5)]);
		}

		const embed = new MessageEmbed()
			.setTitle(`Original Names: ${member1.user.username}, ${member2.user.username}`)
			.setColor("BLUE")
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp()
			.setDescription(`Ship Name: **${shipName}**\nCompatibility: **${rating}%**\n**[**${meter.join("")}**]**`);
		message.channel.send(embed);
	},
};