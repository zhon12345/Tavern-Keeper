/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { promptMessage } = require('../../functions.js');

const chooseArr = ['🗻', '📰', '✂'];

module.exports = {
	name: 'rps',
	category: 'Fun',
	description: 'Play a game of Rock Paper Scissors with me.',
	aliases: [],
	usage: 'rps',
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setDescription('React to one of the emojis to start.');

		const m = await message.channel.send(embed);
		const reacted = await promptMessage(m, message.author, 30, chooseArr);

		const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

		const result = await getResult(reacted, botChoice);

		embed
			.setDescription('')
			.addField(result, `${reacted} vs ${botChoice}`);

		m.edit(embed);

		function getResult(me, clientChosen) {
			if ((me === '🗻' && clientChosen === '✂') ||
                (me === '📰' && clientChosen === '🗻') ||
                (me === '✂' && clientChosen === '📰')) {
				return 'You won!';
			}
			else if (me === clientChosen) {
				return 'It\'s a tie!';
			}
			else {
				return 'You lost!';
			}
		}
	},
};