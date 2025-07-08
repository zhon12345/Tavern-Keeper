const { delay } = require("../../functions");
const frames = ["(-°□°)-  ┬─┬", "(╯°□°)╯    ]", "(╯°□°)╯  ︵  ┻━┻", "(╯°□°)╯       [", "(╯°□°)╯           ┬─┬"];

module.exports = {
	name: "tableflip",
	category: "Fun",
	description: "Flips a table... with animation!",
	aliases: [],
	usage: "tableflip",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const msg = await message.channel.send("(\\\\°□°)\\\\  ┬─┬");
		for (const frame of frames) {
			await delay(1000);
			await msg.edit(frame);
		}
		return msg;
	},
};
