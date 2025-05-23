/* eslint-disable no-unused-vars */
const { BOT_TOKEN } = process.env;

module.exports = {
	name: "restart",
	category: "Owner",
	description: "Restarts the bot.",
	aliases: ["reload"],
	usage: "restart",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message, args) => {
		message.channel.send("⚙ Restarting...").then(msg => msg.delete({ timeout: 300 }))
			.then(() => client.destroy())
			.then(() => client.login(BOT_TOKEN))
			.then(() => message.channel.send("`✔️` Restart Successful"));
	},
};