const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "base64",
	category: "Misc",
	description: "Converts normal text to QmFzZTY0.",
	aliases: [],
	usage: "base64 <encode/decode> <text>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send("`❌` What do you want to do? Encode or decode.");
		} else if (args[0].toLowerCase() === "encode") {
			const text = args.slice(1).join(" ");
			if (!text) {
				return message.channel.send("`❌` Text not found, please provide valid text (eg. `hi`). ");
			} else if (text.length >= 1024) {
				return message.channel.send("`❌` Please provide text that has less than 1024 words.");
			}

			const url = `http://api.some-random-api.com/base64?encode=${encodeURIComponent(text)}`;

			let response;
			try {
				response = await fetch(url).then((res) => res.json());
			} catch {
				return message.channel.send("`❌` An error occurred, please try again!");
			}

			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle("Base64 Encoder")
				.addField("Input", `\`\`\`\n${text}\`\`\``)
				.addField("Output", `\`\`\`\n${response.base64}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		} else if (args[0].toLowerCase() === "decode") {
			const text = args.slice(1).join(" ");
			if (!text) {
				return message.channel.send("`❌` Base64 string not found, please provide valid base64 string (eg. `aGk=`)");
			} else if (text.length >= 1024) {
				return message.channel.send("`❌` Please provide text that has less than 1024 words.");
			}

			const url = `http://api.some-random-api.com/base64?decode=${encodeURIComponent(text)}`;

			let response;
			try {
				response = await fetch(url).then((res) => res.json());
			} catch {
				return message.channel.send("`❌` An error occurred, please try again!");
			}

			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle("Base64 Decoder")
				.addField("Input", `\`\`\`\n${text}\`\`\``)
				.addField("Output", `\`\`\`\n${response.text}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
	},
};
