/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'otter',
	category: 'Animals',
	description: 'What do you prefer? Red pandas or Pandas.',
	aliases: ['redpanda'],
	usage: 'redpandas',
	run: async (client, message, args) => {
		const url = 'https://some-random-api.ml/img/red_panda';

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
			.setImage(response.link);
		message.channel.send(embed);
	},
};