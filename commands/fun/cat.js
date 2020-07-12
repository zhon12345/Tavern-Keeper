/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
	name: 'cat',
	category: 'Fun',
	description: 'Get a random picture of a cat.',
	aliases: ['cats', 'kitty', 'pussy', 'meow'],
	usage: 'cat',
	guildOnly: true,
	run: async (client, message, args) => {
		const subReddits = ['cats', 'cat', 'Blep', 'MostInterestingCats'];
		const random = subReddits[Math.floor(Math.random() * subReddits.length)];
		const img = await randomPuppy(random);

		const embed = new MessageEmbed()
			.setImage(img)
			.setTimestamp()
			.setColor('BLUE')
			.setTitle(`From /r/${random}`)
			.setURL(`http://reddit.com/${random}`);

		message.channel.send(embed);
	},
};