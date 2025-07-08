module.exports = {
	name: "rickroll",
	category: "Fun",
	description: '"Never Gonna Give You Up"',
	aliases: [],
	usage: "rickroll",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message) => {
		message.channel.send({ files: ["./assets/image/rickroll.gif"] }).then(message.delete());
	},
};
