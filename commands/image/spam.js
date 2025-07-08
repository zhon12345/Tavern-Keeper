module.exports = {
	name: "spam",
	category: "Image",
	description: "Sends spam images.",
	aliases: [],
	usage: "spam",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message) => {
		message.channel.send({ files: ["./assets/image/spam.jpg"] });
	},
};
