/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const h2p = require('html2plaintext');
const fetch = require('node-fetch');

module.exports = {
	name: 'lesbian',
	category: 'NSFW',
	description: 'Naked guys weren\'t enough for you. Have some girls.',
	usage: 'lesbian',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		const url = 'https://love-you.xyz/api/v2/lesbian';

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