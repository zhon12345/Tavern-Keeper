module.exports = {
	name: "clear",
	category: "Moderation",
	description: "Clear up to 99 messages in a specified channel.",
	aliases: ["prune", "purge"],
	usage: "purge <amount> [reason]",
	run: async (client, message, args) => {
		if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.guild.me.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send(
				"<:vError:725270799124004934> Insufficient Permission! `MANAGE_MESSAGES` required.",
			);
		}

		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid number.",
			);
		}
		else if (amount <= 0 || amount > 100) {
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