const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "clear",
	category: "Moderation",
	description: "Clear up to 99 messages in a specified channel.",
	aliases: ["prune", "purge"],
	usage: "purge <amount>",
	userperms: ["MANAGE_MESSAGES"],
	botperms: ["USE_EXTERNAL_EMOJIS", "MANAGE_MESSAGES"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		if (!channel) return;

		const amount = parseInt(args[0], 10);
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
		channel.send(
			`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` 🗑️ **${message.author.username}**#${message.author.discriminator} cleared \`${amount}\` messages in ${message.channel}`,
		);

		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully cleared \`${amount}\`messages`,
		).then(msg => msg.delete({ timeout: 5000 }));
	},
};