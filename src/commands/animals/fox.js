/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'fox',
	category: 'Animals',
	description: 'You want some cute animals? Here you go!',
	aliases: ['animal'],
	usage: 'aww',
	run: async (client, message, args) => {
		const url = 'https://randomfox.ca/floof/';

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