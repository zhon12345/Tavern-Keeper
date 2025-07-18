const kaomoji = require("../../assets/json/kaomoji.json");

module.exports = {
	name: "kaomoji",
	category: "Fun",
	description: "Display a random kaomoji! (´・ω・｀) 3000 will definitely be enough to keep you busy! (ｖ｀▽´)ｖ",
	aliases: [],
	usage: "kaomoji",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message) => {
		const face = kaomoji[Math.floor(Math.random() * kaomoji.length)];
		message.channel.send(face);
	},
};
