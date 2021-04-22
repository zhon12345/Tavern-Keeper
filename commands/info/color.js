const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const token = process.env.ALEXFLIPNOTE_API_TOKEN;

module.exports = {
	name: "color",
	category: "Info",
	description: "Shows information about a specified color.",
	aliases: [],
	usage: "color <color>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				"<:vError:725270799124004934> Hex color not found, please provide a valid hex color (eg. `#ffffff`).",
			);
		}

		let colour;
		if(args[0].startsWith("#") && args[0].length === 7) {
			colour = args[0].split("#").join("");
		}
		else if(args[0].startsWith("0x") && args[0].length === 8) {
			colour = args[0].split("0x").join("");
		}
		else {
			return message.channel.send(
				"<:vError:725270799124004934> Hex color not found, please provide a valid hex color (eg. `#ffffff`).",
			);
		}

		const url = `https://api.alexflipnote.dev/colour/${colour}`;

		let response;
		try {
			response = await fetch(url, { headers: {
				"Authorization" : token,
			} }).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}

		const embed = new MessageEmbed()
			.setColor(`#${colour}`)
			.setTitle(response.name)
			.setDescription([
				`**Name: \`${response.name}\`**`,
				`**RGB Value: \`${response.rgb}\`**`,
				`**Hex Value: \`${colour}\`**`,
			])
			.setImage(response.image)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);
	},
};