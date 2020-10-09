/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'duck',
	category: 'Animals',
	description: 'Do you even know what\'s a duck?',
	aliases: ['ducks'],
	usage: 'duck',
	run: async (client, message, args) => {
		const url = 'https://random-d.uk/api/v1/random?type=png';

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
			.setImage(response.url);
		message.channel.send(embed);
	},
};