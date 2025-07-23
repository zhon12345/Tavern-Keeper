const { MessageEmbed } = require("discord.js");
const sets = ["set1", "set2", "set3", "set4"];

module.exports = {
	name: "randomavatar",
	category: "Misc",
	description: "Get random avatars!",
	aliases: ["ravatar"],
	usage: "randomavatar",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const string = Math.random().toString(20).slice(2, 8);
		const set = sets[Math.floor(Math.random() * sets.length)];
		const url = `https://robohash.org/${string}?set=${set}`;

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(string)
			.setURL(url)
			.setImage(url)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};
