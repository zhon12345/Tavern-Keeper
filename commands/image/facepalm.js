/* eslint-disable no-unused-vars */
module.exports = {
	name: "facepalm",
	category: "Image",
	description: "I have no comment...",
	aliases: [],
	usage: "facepalm",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message, args) => {
		message.channel.send({ files: ["./assets/image/facepalm.gif"] });
	},
};