/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'randomfact',
	category: 'Misc',
	description: 'Get a random fact from the internet.',
	aliases: ['rfact'],
	usage: 'randomfact',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const url = 'https://useless-facts.sameerkumar.website/api';

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
			.setDescription(response.data)
			.setTitle('Random Fact')
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};