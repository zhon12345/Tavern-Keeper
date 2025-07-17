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
		if (!text) {
			return message.channel.send("`❌` Query not found, please provide a query. (eg. `Hello`)");
		}

		const url = new URL("http://api.giphy.com/v1/gifs/search");
		const params = new URLSearchParams({
			api_key: API_KEY,
			q: encodeURIComponent(text),
			limit: 10,
			rating: "pg",
			remove_low_contrast: true,
		});

		url.search = params.toString();

		let response;
		try {
			response = await fetch(url.toString()).then((res) => res.json());

			if (response.meta.status !== 200) {
				throw new Error(`Giphy API returned status ${response.meta.status}`);
			}
		} catch (err) {
			console.error(err);
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		if (response.data.length === 0) {
			return message.channel.send(`\`❌\` No results found for query: ${text}.`);
		}

		const data = response.data[0];
		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(data.title)
			.setURL(data.url)
			.setImage(data.images.original.webp)
			.setFooter("Powered by GIPHY")
			.setTimestamp();

		message.channel.send(embed);
	},
};
