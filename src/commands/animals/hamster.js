/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const h2p = require('html2plaintext');
const fetch = require('node-fetch');

module.exports = {
	name: 'hamsters',
	category: 'Animals',
	description: 'hamsters! Do you like em?',
	aliases: [],
	usage: 'hamsters',
	run: async (client, message, args) => {
		const url = [
			'https://www.reddit.com/r/hamsters/hot.json',
		];

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => {
					const random = post[Math.floor(Math.random() * post.length) + 1];
					if(random.is_video === true || !random.url.endsWith('jpg')) {
						return message.channel.send(
							'<:vError:725270799124004934> An error occured, please try again!',
						);
					}
					const embed = new MessageEmbed()
						.setColor('BLUE')
						.setImage(random.url);

					message.channel.send(embed);
				});
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
	},
};