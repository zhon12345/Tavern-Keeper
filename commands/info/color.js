const { isHex } = require('../../functions');
const { stringToHex } = require('../../functions');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'color',
	category: 'Info',
	description: 'Shows information about a specified color.',
	aliases: [],
	usage: 'color <color>',
	run: async (client, message, args) => {
		let colour;
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid color.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else if(isHex(args.join(' ')) != true) {
			colour = stringToHex(args.join(' '));
		}
		else {
			colour = args[0];
		}

		const url = 'https://api.alexflipnote.xyz/colour/' + colour;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}

		const embed = new MessageEmbed()
			.setColor(colour)
			.setTitle(response.name)
			.setImage(response.image)
			.addFields(
				{ name: 'RGB Value', value: `${response.rgb}` },
				{ name: 'Hex Value', value: `#${colour}` },
			);
		message.channel.send(embed);
	},
};