const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const token = process.env.UNSPLASH_CLIENT_TOKEN;

module.exports = {
	name: "wallpaper",
	category: "Misc",
	description: "Get a random wallpaper.",
	aliases: [],
	usage: "wallpaper",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const url = "https://api.unsplash.com/photos/random?client_id=" + token;

		let response;
		try {
			response = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(response.description ? response.description : "Random Wallpaper")
			.setURL(response.urls.raw)
			.setImage(response.urls.raw)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};
