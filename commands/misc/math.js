const math = require("mathjs");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "math",
	category: "Misc",
	description: "Helps you solve a math calculation.",
	aliases: ["calculate"],
	usage: "math <equation>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.join(" ");
		if (!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid calculation",
			);
		}
		if (text.startsWith(":")) return;
		let resp;
		try {
			resp = math.evaluate(text);
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid calculation",
			);
		}

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("Math Calculation")
			.addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
			.addField("Output", `\`\`\`js\n${resp}\`\`\``)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};