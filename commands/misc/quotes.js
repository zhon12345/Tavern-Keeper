/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "quotes",
	category: "Misc",
	description: "Get a random inspiring quote.",
	aliases: [],
	usage: "quotes",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occured, please try again!",
			);
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