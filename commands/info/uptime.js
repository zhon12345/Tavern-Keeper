const { MessageEmbed } = require("discord.js");
const { parseDur } = require("../../functions");

module.exports = {
	name: "uptime",
	description: "Check how long has the bot been online.",
	category: "Info",
	aliases: ["ontime"],
	usage: "uptime",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const duration = parseDur(client.uptime);
		message.channel.send("⌛ Loading...").then((msg) => {
			const pEmbed = new MessageEmbed().setTitle("📥 Online for").setColor("BLUE").setDescription(`**${duration}**`);
			msg.edit(pEmbed);
		});
	},
};
