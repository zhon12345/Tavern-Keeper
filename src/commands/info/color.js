const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const token = process.env.ALEXFLIPNOTE_API_TOKEN;

module.exports = {
	name: 'color',
	category: 'Info',
	description: 'Shows information about a specified color.',
	aliases: [],
	usage: 'color <color>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'`❌` Please provide a valid hex color (eg. `#ffffff`).',
			);
		}

		let colour;
		if(args[0].startsWith('#') && args[0].length === 7) {
			colour = args[0].split('#')[1];
		}
		else if(!args[0].startsWith('#') && args[0].length === 6) {
			colour = args[0];
		}
		else {
			return message.channel.send(
				'`❌` Please provide a valid hex color (eg. `#ffffff`).',
			);
		}

		const url = `https://api.alexflipnote.dev/colour/${colour}`;

		let response;
		try {
			response = await fetch(url, { headers: {
				'Authorization' : token,
			} }).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'`❌` An error occurred, please try again!',
			);
		}

		const embed = new MessageEmbed()
			.setTitle(response.name)
			.addField('RGB Value', response.rgb, true)
			.addField('Brightness', response.brightness, true)
			.addField('Hex Value', response.hex, true)
			.setThumbnail(response.image)
			.setImage(response.image_gradient, true)
			.setColor(response.hex)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);
	},
};