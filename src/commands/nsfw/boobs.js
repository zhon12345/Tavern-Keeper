/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'boobs',
	category: 'NSFW',
	description: 'See some cute ~~birbs~~ boobs!',
	aliases: ['boobie', 'boobies'],
	usage: 'boobs',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		const url = 'http://api.oboobs.ru/boobs/0/1/random';

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
			.setImage(`http://media.oboobs.ru/${response[0].preview}`);

		message.channel.send(embed);
	},
};