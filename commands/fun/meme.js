/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
	name: 'meme',
	category: 'Fun',
	description: 'Get a random meme from reddit.',
	aliases: ['memes'],
	usage: 'meme',
	guildOnly: true,
	run: async (client, message, args) => {
		const subReddits = ['memes', 'meme', 'dankmemes'];
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