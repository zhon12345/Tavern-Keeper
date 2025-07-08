module.exports = {
	name: "shutdown",
	category: "Owner",
	description: "Shutdown the bot.",
	aliases: ["reload"],
	usage: "restart",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message) => {
		try {
			message.channel.send("⚙ Shutting down...").then(() => process.exit());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
	},
};
