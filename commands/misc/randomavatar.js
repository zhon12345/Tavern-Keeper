/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

const sets = [
	"set1",
	"set2",
	"set3",
	"set4",
];
const set = sets[Math.floor(Math.random() * sets.length)];

module.exports = {
	name: "randomavatar",
	category: "Misc",
	description: "Get random avatars!",
	aliases: ["ravatar"],
	usage: "randomavatar",
	run: async (client, message, args) => {
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