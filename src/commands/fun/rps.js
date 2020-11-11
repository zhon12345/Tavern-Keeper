/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { getResult } = require('../../functions.js');

const chooseArr = ['🗻', '📰', '✂'];

module.exports = {
	name: 'rps',
	category: 'Fun',
	description: 'Play a game of Rock Paper Scissors.',
	aliases: [],
	usage: 'rps',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS', 'ADD+REACTIONS'],
	run: async (client, message, args) => {
		const filter = (reaction, user) => chooseArr.includes(reaction.emoji.name) && user.id === message.author.id;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Rock Paper Scissors')
			.setDescription('React to one of the emojis to start.');

		const m = await message.channel.send(embed);

		for (const reaction of chooseArr) await m.react(reaction);

		m.awaitReactions(filter, { max: 1, time: 10000 })
			.then(collected => {
				const emoji = collected.first() && collected.first().emoji.name;
				if(!emoji) {
					embed
						.setDescription('Looks like you did not answer in time.');

					return m.edit(embed);
				}
				else {
					const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
					const result = getResult(emoji, botChoice);

					embed
						.setTitle('Rock Paper Scissors')
						.setDescription([`
						${emoji} vs ${botChoice}

						${result}
						`]);

					m.edit(embed);
				}
			});
	},
};