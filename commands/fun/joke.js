const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "joke",
	category: "Fun",
	description: "Get a funny joke. Dad's love them!",
	aliases: ["pun"],
	usage: "joke",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const url = "https://official-joke-api.appspot.com/jokes/random";
		let response;
		try {
			response = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(response.setup)
			.setDescription(response.punchline)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};
