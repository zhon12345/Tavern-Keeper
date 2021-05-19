/* eslint-disable no-unused-vars */
module.exports = {
	name: 'lenny',
	category: 'Fun',
	description: 'Surely you know what lenny is, everyone does.',
	aliases: [],
	usage: 'lenny',
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		message.channel.send('( ͡° ͜ʖ ͡°)');
	},
};