/* eslint-disable no-unused-vars */
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'nitro',
	category: 'Image',
	description: 'Sends an image of a fake nitro giveaway.',
	aliases: [],
	usage: 'nitro',
	run: (client, message, args) => {

		const image = ('https://external-preview.redd.it/vAL7YpeYdiGLfPOjIAxw7hHSiHIn0GDt7izFw_xf3ig.png?auto=webp&s=42cf89cc12e74263ded4019068c7f2c7e9025003');
		const attachment = new MessageAttachment(image, 'nitro.png');
		message.channel.send(attachment).then(message.delete());
	},
};