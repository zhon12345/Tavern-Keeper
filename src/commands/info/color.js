const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

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
			colour = args[0].split('#').join('');
		}
		else if(args[0].startsWith('0x') && args[0].length === 8) {
			colour = args[0].split('0x').join('');
		}
		else if(args[0].length === 6) {
			colour = args[0];
		}
		else {
			return message.channel.send(
				'`❌` Please provide a valid hex color (eg. `#ffffff`).',
			);
		}

		const url = `https://api.alexflipnote.xyz/colour/${colour}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'`❌` An error occurred, please try again!',
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