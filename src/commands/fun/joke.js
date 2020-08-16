/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'joke',
	category: 'Fun',
	description: 'Get a funny joke. Dad\'s love them!',
	aliases: ['pun'],
	usage: 'joke',
	run: async (client, message, args) => {
		const url = 'https://official-joke-api.appspot.com/jokes/random';
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
			.setColor('BLUE')
			.setTitle(response.setup)
			.setDescription(response.punchline)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};