/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions');

module.exports = {
	name: 'activity',
	category: 'Misc',
	description: 'Feeling bored? Get some activities to do.',
	aliases: [],
	usage: 'activity',
	run: async (client, message, args) => {
		const url = 'https://www.boredapi.com/api/activity/';

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('You should...')
			.setDescription(response.activity)
			.addField('Category', capitalizeFirstLetter(response.type), true)
			.addField('Participants', response.participants, true)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};