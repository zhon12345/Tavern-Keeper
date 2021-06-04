/* eslint-disable no-unused-vars */
module.exports = {
	name: "worm",
	category: "Fun",
	description: "Makes a worm of a random length",
	aliases: [],
	usage: "worm",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const length = Math.floor(Math.random() * 20);
		const worm = `<:h_:744855831790485554>${"<:b_:744855831496884284>".repeat(length)}<:t_:744855832264704010>`;
		message.channel.send(worm);
	},
};