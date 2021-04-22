module.exports = {
	name: "pin",
	category: "Moderation",
	description: "Pin a specific messaged to the channel.",
	aliases: [],
	usage: "pin <message>",
	userperms: ["MANAGE_MESSAGES"],
	botperms: ["USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
	run: async (bot, message, args) => {
		const msg = args[0];
		if(!msg || isNaN(msg)) {
			return message.channel.send(
				"<:vError:725270799124004934> Message ID not found, please provide a valid message ID. (eg. `834778767485960233`)",
			);
		}
		try {
			message.channel.messages.fetch(msg)
				.then(pinned => {
					if(!pinned.pinned) {
						pinned.pin(msg);
						message.channel.send(
							`<:vSuccess:725270799098970112> Successfully pinned ${msg}`,
						).then(message.delete());
					}
					else {
						return message.channel.send(
							"<:vError:725270799124004934> That message is not pinned.",
						);
					}
				});
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}
	},
};