const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "binary",
	category: "Misc",
	description: "Converts normal text to 011000100110100101101110011000010111001001111001.",
	aliases: [],
	usage: "binary <encode/decode> <text>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				"<:vError:725270799124004934> What do you want to do? Encode or decode.",
			);
		}
		else if (args[0].toLowerCase() === "encode") {
			const text = args.slice(1).join(" ");
			if (!text) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide valid text (eg. `hi`).",
				);
			}
			else if(text.length >= 1024) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide text that has less than 1024 words.",
				);
			}

			const url = `http://some-random-api.ml/binary?text=${text}`;

			let response;
			try {
				response = await fetch(url).then(res => res.json());
			}
			catch (e) {
				return message.channel.send("<:vError:725270799124004934> An error occurred, please try again!");
			}

			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle("Binary Encoder")
				.addField("Input", `\`\`\`\n${text}\`\`\``)
				.addField("Output", `\`\`\`\n${response.binary}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
		else if (args[0].toLowerCase() === "decode") {
			const text = args.slice(1).join(" ");
			if (!text) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide valid binary number (eg. `0110100001101001`).",
				);
			}
			else if(text.length >= 1024) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide text that has less than 1024 words.",
				);
			}

			const url = `http://some-random-api.ml/binary?decode=${text}`;

			let response;
			try {
				response = await fetch(url).then(res => res.json());
			}
			catch (e) {
				return message.channel.send("<:vError:725270799124004934> An error occurred, please try again!");
			}

			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle("Binary Decoder")
				.addField("Input", `\`\`\`\n${text}\`\`\``)
				.addField("Output", `\`\`\`\n${response.text}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
	},
};