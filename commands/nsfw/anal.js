/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'anal',
	category: 'NSFW',
	description: 'Sends images of anal porn, what do you expect?',
	aliases: [],
	usage: 'anal',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		const url = [
			'https://nekobot.xyz/api/image?type=anal',
		];

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
			.setImage(response.message);

		message.channel.send(embed);
	},
};