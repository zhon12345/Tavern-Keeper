/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const url = 'https://some-random-api.ml/meme';

module.exports = {
	name: 'meme',
	category: 'Image',
	description: 'Get a random meme.',
	aliases: ['memes'],
	usage: 'meme',
	guildOnly: true,
	run: async (client, message, args) => {
		let data, response;
		try {
			response = await axios.get(url);
			data = response.data;
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again.',
			);
		}

		const embed = new MessageEmbed()
			.setImage(data.image)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle(data.caption);

		message.channel.send(embed);
	},
};