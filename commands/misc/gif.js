const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const API_KEY = process.env.GIPHY_API_TOKEN;

module.exports = {
	name: "gif",
	category: "Misc",
	description: "Searches for a specified gif.",
	aliases: [],
	usage: "gif <text>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!message.channel.nsfw) {
			return message.channel.send(
				"`❌` This command can only be used in a nsfw channel.",
			);
		}
		if (!text) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text. (eg. `Hello`)",
			);
		}


		const url = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(text)}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(response.data[0].title)
			.setURL(response.data[0].url)
			.setImage(response.data[0].images.original.url)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};