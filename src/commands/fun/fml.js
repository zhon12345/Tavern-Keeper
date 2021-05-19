/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'fml',
	category: 'Fun',
	description: 'Is looking at the misery of others funny?.',
	aliases: ['fmylife'],
	usage: 'fml',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const url = 'https://api.alexflipnote.dev/fml';
		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'`❌` An error occurred, please try again!',
			);
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setDescription(response.text)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();

		message.channel.send(embed);
	},
};