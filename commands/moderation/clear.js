module.exports = {
	name: "clear",
	category: "Moderation",
	description: "Clear up to 99 messages in a specified channel.",
	aliases: ["prune", "purge"],
	usage: "purge <amount>",
	userperms: ["MANAGE_MESSAGES"],
	botperms: ["USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
	run: async (client, message, args) => {
		const amount = args[0];

		if (isNaN(amount)) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid number.",
			);
		}
		else if (amount <= 0 || amount >= 100) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid number between 1 and 99.",
			);
		}

		message.channel.bulkDelete(amount + 1, true);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully cleared \`${amount}\`messages`,
		).then(msg => msg.delete({ timeout: 5000 }));
	},
};