module.exports = {
	name: "nitro",
	category: "Image",
	description: "Ever wanted a fake nitro giveaway? Now you've got one.",
	aliases: [],
	usage: "nitro",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message) => {
		message.channel.send({ files: ["./assets/image/nitro.png"] }).then(message.delete());
	},
};
