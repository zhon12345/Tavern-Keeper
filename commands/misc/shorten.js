const fetch = require("node-fetch");
const { isURL } = require("../../functions");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "shorten",
	category: "Misc",
	description: "Shortens a provided link.",
	aliases: ["short"],
	usage: "shorten <url>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const link = args.slice().join(" ");
		if (!link) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid link.",
			);
		}
		else if(!isURL(link)) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid link.",
			);
		}

		const url = `https://is.gd/create.php?format=simple&url=${encodeURI(link)}`;

		let response;
		try {
			response = await fetch(url)
				.then(res => res.text());
		}
		catch (e) {
			return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
		}

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle("Link Shortener")
			.addField("Input", `\`\`\`\n${link}\`\`\``)
			.addField("Output", `\`\`\`\n${response}\`\`\``)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};