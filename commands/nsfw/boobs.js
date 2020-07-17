/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'boobs',
	category: 'NSFW',
	description: 'Sends images of boobs, what do you expect?',
	aliases: ['boobie', 'boobies'],
	usage: 'boobs',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}

		const max = 5511;
		const min = 1000;
		const MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
		const MathLoL = Math.round(MathRan);

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setImage(`http://media.oboobs.ru/boobs_preview/0${MathLoL}.jpg`);

		message.channel.send(embed);
	},
};