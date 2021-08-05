module.exports = {
	name: "say",
	category: "Owner",
	description: "Make the bot say whatever you want.",
	aliases: ["imitate"],
	usage: "say <text>",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text. (eg. `Hello`)",
			);
		}
		message.channel.send(text);
	},
};