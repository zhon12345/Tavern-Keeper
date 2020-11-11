/* eslint-disable no-unused-vars */
module.exports = {
	name: "facepalm",
	category: "Image",
	description: "I have no comments...",
	aliases: [],
	usage: "facepalm",
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		message.channel.send({ files: ["./assets/image/facepalm.gif"] });
	},
};