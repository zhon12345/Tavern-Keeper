const { MessageEmbed } = require("discord.js");
const moment = require("moment");

const verificationLevels = {
	NONE: "None",
	LOW: "Low",
	MEDIUM: "Medium",
	HIGH: "(╯°□°）╯︵ ┻━┻",
	VERY_HIGH: "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻",
};

const regions = {
	brazil: "Brazil",
	europe: "Europe",
	hongkong: "Hong Kong",
	india: "India",
	japan: "Japan",
	russia: "Russia",
	singapore: "Singapore",
	southafrica: "South Africa",
	sydney: "Sydeny",
	"us-central": "US Central",
	"us-east": "US East",
	"us-west": "US West",
	"us-south": "US South",
	"eu-west": "EU West",
};

module.exports = {
	name: "serverinfo",
	category: "Info",
	description: "Displays information about the server.",
	aliases: ["server", "guild", "guildinfo", "si", "gi"],
	usage: "serverinfo",
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		const members = guild.members.cache;
		const channels = guild.channels.cache;
		const emojis = guild.emojis.cache;

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.setTitle("Guild Information")
			.addFields(
				{ name: "Guild Name", value: `\`\`\`${guild.name}\`\`\``, inline:true },
				{ name: "Guild ID", value: `\`\`\`${guild.id}\`\`\``, inline:true },
				{ name: "Guild Owner", value: `\`\`\`${guild.owner.user.tag}\`\`\`` },
				{ name: "Verification Level", value: `\`\`\`${verificationLevels[guild.verificationLevel]}\`\`\``, inline:true },
				{ name: "Region", value: `\`\`\`${regions[guild.region]}\`\`\``, inline:true },
				{ name: `Member Count [${guild.memberCount}]`, value: `\`\`\`${members.filter(member => !member.user.bot).size} Users | ${members.filter(member => member.user.bot).size} Bots\`\`\`` },
				{ name: `Channels [${channels.filter(ch => ch.type === "text").size + channels.filter(channel => channel.type === "voice").size}]`, value: `\`\`\`${channels.filter(channel => channel.type === "text").size} Text ${channels.filter(channel => channel.type === "voice").size} Voice\`\`\`` },
				{ name: "Guild Boost Tier", value: `\`\`\`Tier ${guild.premiumTier}\`\`\``, inline:true },
				{ name: "Guild Boost Count", value: `\`\`\`${guild.premiumSubscriptionCount}\`\`\``, inline:true },
				{ name: `Emoji Count [${emojis.size}]`, value: `\`\`\`${emojis.filter(emoji => !emoji.animated).size} Regular ${emojis.filter(emoji => emoji.animated).size} Animated\`\`\`` },
				{ name: "Created", value: `\`\`\`${moment(guild.createdTimestamp).format("MMMM Do YYYY, h:mm:ss")} | ${Math.floor((Date.now() - guild.createdTimestamp) / 86400000)} day(s) ago\`\`\`` },
			)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();

		message.channel.send(embed);
	},
};