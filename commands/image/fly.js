module.exports = {
	name: "fly",
	category: "Image",
	description: "Sends a fake image of a fly that looks suspiciously real.",
	aliases: [],
	usage: "fly",
	disabled: false,
	userperms: [],
	botperms: ["ATTACH_FILES"],
	run: async (client, message) => {
		message.channel.send({ files: ["./assets/image/fly.png"] }).then(message.delete());
	},
};
