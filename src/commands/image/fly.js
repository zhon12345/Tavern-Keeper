/* eslint-disable no-unused-vars */
module.exports = {
	name: 'fly',
	category: 'Animals',
	description: 'Sends a fake image of a fly that looks suspiciously real.',
	aliases: [],
	usage: 'fly',
	disabled: false,
	userperms: [],
	botperms: ['ATTACH_FILES'],
	run: (client, message, args) => {
		message.channel.send({ files: ['./assets/image/fly.png'] }).then(message.delete());
	},
};