/* eslint-disable no-unused-vars */
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'spam',
	category: 'Image',
	description: 'Sends an image of a spam.',
	aliases: [],
	usage: 'spam',
	run: (client, message, args) => {

		const image = ('https://i.imgflip.com/3dxuk0.jpg');
		const attachment = new MessageAttachment(image, 'spam.png');
		message.channel.send(attachment);
	},
};