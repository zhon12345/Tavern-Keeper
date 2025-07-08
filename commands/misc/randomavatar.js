const { MessageEmbed } = require("discord.js");
const set = ["set1", "set2", "set3", "set4"][Math.floor(Math.random() * 4)];

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
		const string = Math.random().toString(20).substr(2, 6);
		const urls = [
			`https://robohash.org/${string}?set=${set}`,
			`https://api.adorable.io/avatars/${string}.png`,
			`https://api.kwelo.com/v1/media/identicon/${string}`,
		];
		const url = urls[Math.floor(Math.random() * urls.length)];

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
