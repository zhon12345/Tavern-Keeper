/* eslint-disable no-unused-vars */
module.exports = {
	name: 'nitro',
	category: 'Image',
	description: 'Ever wanted a fake nitro giveaway? Now you\'ve got one.',
	aliases: [],
	usage: 'nitro',
	run: (client, message, args) => {
		message.channel.send({ files: ['./assets/image/nitro.png'] }).then(message.delete());
	},
};