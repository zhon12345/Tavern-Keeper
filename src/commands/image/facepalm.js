/* eslint-disable no-unused-vars */
module.exports = {
	name: 'facepalm',
	category: 'Image',
	description: 'I have no comments...',
	aliases: [],
	usage: 'facepalm',
	run: (client, message, args) => {
		message.channel.send({ files: ['./assets/image/facepalm.gif'] });
	},
};