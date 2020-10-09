/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'bear',
	category: 'Animals',
	description: 'Did you know that bears have a heightened sense of smell?',
	aliases: ['bears'],
	usage: 'bear',
	run: async (client, message, args) => {
		const url = 'https://no-api-key.com/api/v1/animals/bear';

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setImage(response.image);
		message.channel.send(embed);
	},
};