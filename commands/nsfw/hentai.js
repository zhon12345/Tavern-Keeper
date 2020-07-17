/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'hentai',
	category: 'NSFW',
	description: 'Sends hentai images, what do you expect?',
	aliases: [],
	usage: 'hentai',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		const urls = [
			'https://nekos.life/api/v2/img/anal',
			'https://nekos.life/api/v2/img/hentai',
			'https://nekos.life/api/v2/img/boobs',
			'https://nekos.life/api/v2/img/blowjob',
			'https://nekos.life/api/v2/img/classic',
			'https://nekos.life/api/v2/img/cum',
			'https://nekos.life/api/v2/img/feet',
		];

		let response;
		try {
			const url = urls[Math.floor(Math.random() * urls.length)];
			response = await fetch(url).then(res => res.json());

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