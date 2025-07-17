const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "color",
	category: "Info",
	description: "Shows information about a specified color.",
	aliases: [],
	usage: "color <color>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		let color = args[0];

		if (!color || (color.startsWith("#") && color.length !== 7) || (!color.startsWith("#") && color.length !== 6)) {
			return message.channel.send("`❌` Hex color not found, please provide a valid hex color (eg. `#ffffff`).");
		}

		color = color.startsWith("#") ? color.slice(1) : color;

		const url = new URL(`https://api.alexflipnote.dev/colour/${encodeURIComponent(color)}`);

		let response;
		try {
			response = await fetch(url.toString()).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		if (response.code) {
			return message.channel.send(`\`❌\` No results found for color: ${color}`);
		}

		const embed = new MessageEmbed()
			.setTitle(response.name)
			.setThumbnail(response.images.square)
			.addField("RGB Value", response.rgb.string, true)
			.addField("Brightness", response.brightness, true)
			.addField("Hex Value", response.hex.string, true)
			.setImage(response.images.gradient)
			.setColor(response.hex.string)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);
	},
};
