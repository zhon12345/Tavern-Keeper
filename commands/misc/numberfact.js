/* eslint-disable no-unused-vars */
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "numberfact",
	category: "Misc",
	description: "Get a number fact from the internet.",
	aliases: [],
	usage: "numberfact <number>",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const number = args[0];
		if(isNaN(args[0])) {
			return message.channel.send(
				"`❌` Number not found, please provide a valid number. (eg. `1`)",
			);
		}

		try {
			const text = await fetch(`http://numbersapi.com/${number}`).then(res => res.text());
			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setDescription(text)
				.setTitle("Number Fact")
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
		catch (e) {
			return message.channel.send(
				"`❌` An error occurred, please try again!",
			);
		}

	},
};