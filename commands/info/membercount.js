const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "membercount",
	category: "Info",
	description: "Displays the specified guild's member count.",
	aliases: ["usercount", "uc", "mc"],
	usage: "membercount",
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		const members = guild.members.cache;
		const embed = new MessageEmbed()
			.setTitle(`${guild.name}'s member count`)
			.setColor("BLUE")
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addFields(
				{ name: "Humans", value: `\`\`\`${members.filter(member => !member.user.bot).size}\`\`\``, inline:true },
				{ name: "Bots", value: `\`\`\`${members.filter(member => member.user.bot).size}\`\`\``, inline:true },
				{ name: "Total Members", value: `\`\`\`${guild.memberCount}\`\`\`` },
				{ name: "\u200b", value: "**Presence**" },
				{ name: "Online", value: `\`\`\`${members.filter(member => member.presence.status === "online").size}\`\`\``, inline:true },
				{ name: "Idle", value: `\`\`\`${members.filter(member => member.presence.status === "idle").size}\`\`\``, inline:true },
				{ name: "Do Not Disturb", value: `\`\`\`${members.filter(member => member.presence.status === "dnd").size}\`\`\``, inline:true },
				{ name: "Offline", value: `\`\`\`${members.filter(member => member.presence.status === "offline").size}\`\`\`` },
			);
		message.channel.send(embed);
	},
};