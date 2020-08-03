/* eslint-disable no-unused-vars */
module.exports = {
	name: 'spam',
	category: 'Image',
	description: 'Sends spam images.',
	aliases: [],
	usage: 'spam',
	run: (client, message, args) => {
		message.channel.send({ files: ['./assets/image/spam.jpg'] });
	},
};