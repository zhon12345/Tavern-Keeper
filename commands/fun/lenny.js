/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const rollDice = () => Math.floor(Math.random() * 6) + 1;

module.exports = {
	name: 'lenny',
	category: 'Fun',
	description: 'Surely you know what lenny is, everyone does.',
	aliases: [],
	usage: 'lenny',
	run: async (client, message, args) => {
		message.channel.send('( ͡° ͜ʖ ͡°)');
	},
};