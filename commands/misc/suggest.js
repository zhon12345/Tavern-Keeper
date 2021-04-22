/* eslint-disable no-shadow */
const moment = require("moment");

module.exports = {
	name: "suggest",
	category: "Misc",
	description: "Make suggestion for the bot's upcoming features.",
	aliases: [],
	usage: "suggest <suggestion>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Text not found, please provide valid text. (eg. `Add a Lyrics command.`)",
			);
		}
		const channel = client.channels.cache.get("720955196494053376");
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` ❗ **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id}) has made a suggestion in **${message.guild.name}** (ID: ${message.guild.id}).\n\`[Suggestion]\` ${text}`,
		);
		await message.channel.send(
			"<:vSuccess:725270799098970112> Successfully made the suggestion.",
		).then(message.delete());
	},
};