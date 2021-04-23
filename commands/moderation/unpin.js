module.exports = {
	name: "unpin",
	category: "Moderation",
	description: "Unpin a specific messaged to the channel.",
	aliases: [],
	usage: "unpin <message>",
	userperms: ["MANAGE_MESSAGES"],
	botperms: ["USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
	run: async (bot, message, args) => {
		const msg = args[0];
		if(!msg || isNaN(msg)) {
			return message.channel.send(
				"`❌` Message ID not found, please provide a valid message ID. (eg. `834778767485960233`)",
			);
		}
		try {
			message.channel.messages.fetch(msg)
				.then(pinned => {
					if(pinned.pinned) {
						pinned.unpin(msg);
						message.channel.send(
							`\`✔️\` Successfully unpinned ${msg}`,
						).then(message.delete());
					}
					else {
						return message.channel.send(
							"`❌` That message is not pinned.",
						);
					}
				});
		}
		catch (e) {
			return message.channel.send(
				"`❌` An error occurred, please try again!",
			);
		}
	},
};