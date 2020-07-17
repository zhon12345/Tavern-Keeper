/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ass',
	category: 'NSFW',
	description: 'Sends images of ass, what do you expect?',
	aliases: ['butt', 'booty'],
	usage: 'ass',
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
			.setImage(`http://media.obutts.ru/butts_preview/0${MathLoL}.jpg`);

		message.channel.send(embed);
	},
};