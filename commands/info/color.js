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
		if(!args[0]) {
			return message.channel.send(
				"`❌` Hex color not found, please provide a valid hex color (eg. `#ffffff`).",
			);
		}

		let colour;
		if(args[0].startsWith("#") && args[0].length === 7) {
			colour = args[0].split("#")[1];
		}
		else if(!args[0].startsWith("#") && args[0].length === 6) {
			colour = args[0];
		}
		else {
			return message.channel.send(
				"`❌` Hex color not found, please provide a valid hex color (eg. `#ffffff`).",
			);
		}

		const url = `https://api.alexflipnote.dev/colour/${colour}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				"`❌` An error occurred, please try again!",
			);
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