/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const token = process.env.AMETHYSTE_API_TOKEN;

module.exports = {
	name: 'wallpaper',
	category: 'Misc',
	description: 'Get a ramdom wallpaper.',
	aliases: [],
	usage: 'walpaper',
	run: async (client, message, args) => {
		const url = 'https://v1.api.amethyste.moe/image/wallpaper';

		let response;
		try {
			response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				':vError: An error occured, please try again!',
			);
		}
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setImage(response.url);

		message.channel.send(embed);
	},
};