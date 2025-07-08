const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "quotes",
	category: "Misc",
	description: "Get a random inspiring quote.",
	aliases: [],
	usage: "quotes",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

		let response;
		try {
			response = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setDescription(response.quoteAuthor)
			.setTitle(response.quoteText)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};
