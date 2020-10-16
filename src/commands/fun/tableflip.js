/* eslint-disable no-unused-vars */
const { delay } = require('../../functions');
const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯       [',
	'(╯°□°)╯           ┬─┬',
];

module.exports = {
	name: 'tableflip',
	category: 'Fun',
	description: 'Flips a table... with animation!',
	usage: 'tableflip',
	run: async (client, message, args) => {
		const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
		for (const frame of frames) {
			await delay(1000);
			await msg.edit(frame);
		}
		return msg;
	},
};