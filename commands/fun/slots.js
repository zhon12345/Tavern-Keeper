/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'slots',
	category: 'Fun',
	description: 'Play slots.',
	aliases: [],
	usage: 'slots',
	run: async (client, message, args) => {
		const replys1 = [
			':gem: : :gem: : :gem: ',
			':lemon: : :lemon: : :lemon: ',
			':seven: : :seven: : :seven: ',
			':bell: : :bell: : :bell:',
			':cherries: : :cherries: : :cherries: ',
			':star: : :star: : :star: ',
			':gem: : :star: : :seven: ',
			':star: : :bell: : :bell:',
			':star: : :star: : :cherries: ',
			':gem: : :gem: : :cherries:',
			':gem: : :seven: : :seven: ',
			':star: : :bell: : :lemon: ',
			':star: : :star: : :cherries: ',
			':seven: : :star: : :star: ',
			':star: : :star: : :seven: ',
			':gem: : :gem: : :seven: ',
		];
		const reponse = (replys1[Math.floor(Math.random() * replys1.length)]);

		const replys2 = [
			':gem: : :gem: : :gem: ',
			':lemon: : :lemon: : :lemon: ',
			':seven: : :seven: : :seven: ',
			':bell: : :bell: : :bell:',
			':cherries: : :cherries: : :cherries: ',
			':gem: : :star: : :seven: ',
			':star: : :bell: : :bell:',
			':star: : :star: : :cherries: ',
			':gem: : :gem: : :cherries:',
			':gem: : :seven: : :seven: ',
			':star: : :bell: : :lemon: ',
			':star: : :star: : :cherries: ',
			':seven: : :star: : :star: ',
			':star: : :star: : :seven: ',
			':gem: : :gem: : :seven: ',
			':gem: : :cherries: : :cherries:',
			':gem: : :bell: : :star:',
		];
		const reponse2 = (replys2[Math.floor(Math.random() * replys2.length)]);
		const replys3 = [
			':lemon: : :lemon: : :lemon: ',
			':bell: : :bell: : :bell:',
			':cherries: : :cherries: : :cherries: ',
			':star: : :star: : :star: ',
			':gem: : :star: : :seven: ',
			':star: : :bell: : :bell:',
			':star: : :star: : :cherries: ',
			':gem: : :gem: : :cherries:',
			':gem: : :seven: : :seven: ',
			':star: : :bell: : :lemon: ',
			':star: : :star: : :cherries: ',
			':seven: : :star: : :star: ',
			':star: : :star: : :seven: ',
			':gem: : :gem: : :seven: ',
		];
		const reponse3 = (replys3[Math.floor(Math.random() * replys3.length)]);

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setDescription(`**[ :slot_machine: ${message.author} launched the slot machine! :slot_machine: ]**`)
			.addField('**-------------------**', '** **')
			.addField(`${reponse} \n \n${reponse2}**<** \n \n${reponse3}`, '** **')
			.addField('**-------------------**', '** **');
		message.channel.send(embed);
	},
};