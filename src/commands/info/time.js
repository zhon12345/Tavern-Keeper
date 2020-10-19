/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'time',
	category: 'Info',
	description: 'Shows the current time.',
	aliases: [],
	usage: 'time',
	run: async (client, message, args) => {
		const pEmbed = new MessageEmbed()
			.setColor('BLUE')
			.addField('Today is', `${moment(Date.now()).format('dddd, MMMM Do YYYY, h:mm:ss a')}`);
		message.channel.send(pEmbed);
	},
};