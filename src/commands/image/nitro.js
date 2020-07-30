/* eslint-disable no-unused-vars */
module.exports = {
	name: 'nitro',
	category: 'Image',
	description: 'Sends an image of a fake nitro giveaway.',
	aliases: [],
	usage: 'nitro',
	run: (client, message, args) => {
		message.channel.send({ files: ['./assets/image/nitro.png'] }).then(message.delete());
	},
};