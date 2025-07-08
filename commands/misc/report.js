const moment = require("moment");

module.exports = {
	name: "report",
	category: "Misc",
	description: "Report an issue within the bot to the developers.",
	aliases: [],
	usage: "report <issue>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send(
				"`❌` Text not found, please provide text. (eg. `Help command is broken, it does not send the help embed.`)",
			);
		}
		const channel = client.channels.cache.get("720955196494053376");
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` ⚠️ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id}) has reported an issue in **${message.guild.name}** (ID: ${message.guild.id}). \n\`[Issue]\` ${text}`,
		);
		await message.channel.send("`✔️` Successfully reported the issue.").then(message.delete());
	},
};
