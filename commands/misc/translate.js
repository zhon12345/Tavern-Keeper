/* eslint-disable no-unused-vars */
const { translate } = require("@vitalets/google-translate-api");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "translate",
	category: "Misc",
	description: "Why does this mean? Time to translate it.",
	aliases: [],
	usage: "translate",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text. (eg. `你好`)",
			);
		}

		await translate(text, {
			to: "en",
		}).then(res => {
			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle(`${res.raw.src} Translator`)
				.addField("Input", `\`\`\`\n${text}\`\`\``)
				.addField("Output", `\`\`\`\n${res.text}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}).catch(e => {
			return message.channel.send(
				"`❌` An error occurred, please try again!",
			);
		});
	},
};