/* eslint-disable no-unused-vars */
module.exports = {
	name: 'rickroll',
	category: 'Fun',
	description: 'Sends a link to the "Never Gonna Give You Up" music video.',
	aliases: [],
	usage: 'rickroll',
	run: async (client, message, args) => {
		message.channel.send({ files: ['./assets/image/rickroll.gif'] }).then(message.delete());
	},
};