const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "randomfact",
	category: "Misc",
	description: "Get a random fact from the internet.",
	aliases: [],
	usage: "randomfact",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const url = "https://useless-facts.sameerkumar.website/api";

		let response;
		try {
			response = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setDescription(response.data)
			.setTitle("Random Fact")
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};
