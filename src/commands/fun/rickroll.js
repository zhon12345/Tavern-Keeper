/* eslint-disable no-unused-vars */
module.exports = {
	name: 'rickroll',
	category: 'Fun',
	description: '"Never Gonna Give You Up"',
	usage: 'rickroll',
	run: async (client, message, args) => {
		message.channel.send({ files: ['./assets/image/rickroll.gif'] }).then(message.delete());
	},
};