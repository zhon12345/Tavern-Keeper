/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'wallpaper',
	category: 'Misc',
	description: 'Get the wallpaper of the day from bing.',
	aliases: [],
	usage: 'walpaper',
	run: async (client, message, args) => {
		const url = 'https://bing.biturl.top/?mkt=en-US';

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
			.setImage(response.url)
			.setTitle(response.copyright);

		message.channel.send(embed);
	},
};