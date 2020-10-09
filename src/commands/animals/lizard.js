/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'platypus',
	category: 'Animals',
	description: 'How do you describe them again?',
	aliases: ['otters'],
	usage: 'platypus',
	run: async (client, message, args) => {
		const url = 'https://nekos.life/api/v2/img/lizard';

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