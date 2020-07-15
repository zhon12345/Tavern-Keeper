/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const url = 'https://some-random-api.ml/meme';

module.exports = {
	name: 'meme',
	category: 'Image',
	description: 'Get a random meme.',
	aliases: ['memes'],
	usage: 'meme',
	guildOnly: true,
	run: async (client, message, args) => {
		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again.',
			);
		}

		const embed = new MessageEmbed()
			.setImage(response.image)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle(response.caption);

		message.channel.send(embed);
	},
};