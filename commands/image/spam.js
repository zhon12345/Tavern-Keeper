/* eslint-disable no-unused-vars */
module.exports = {
	name: "spam",
	category: "Image",
	description: "Sends spam images.",
	aliases: [],
	usage: "spam",
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		message.channel.send({ files: ["./assets/image/spam.jpg"] });
	},
};