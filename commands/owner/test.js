const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "test",
	category: "Owner",
	description: "Checks if the bot is working.",
	aliases: [],
	usage: "test",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const embed = new MessageEmbed()
			.setTitle("I am working!")
			.setColor("BLUE")
			.setImage("https://media.giphy.com/media/gw3IWyGkC0rsazTi/200.gif");
		message.channel.send(embed);
	},
};
