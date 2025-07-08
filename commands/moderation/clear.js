const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");
const sourcebin = require("sourcebin_js");
const moment = require("moment");

module.exports = {
	name: "clear",
	category: "Moderation",
	description: "Clear up to 99 messages in a specified channel.",
	aliases: ["prune", "purge"],
	usage: "purge <amount>",
	disabled: false,
	userperms: ["MANAGE_MESSAGES"],
	botperms: ["MANAGE_MESSAGES"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const amount = parseInt(args[0], 10);
		if (isNaN(amount)) {
			return message.channel.send("`❌` Number not found, please provide a valid number. (eg. `15`)");
		} else if (amount <= 0 || amount >= 100) {
			return message.channel.send("`❌` Please provide a valid number between 1 and 99.");
		}

		if (channel) {
			message.channel.messages.fetch({ limit: amount + 1 }).then(async (messages) => {
				const output = messages
					.array()
					.reverse()
					.map(
						(m) =>
							`${new Date(m.createdAt).toLocaleString("en-US")} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`,
					)
					.join("\n");

				let response;
				try {
					response = await sourcebin.create(
						[
							{
								name: " ",
								content: output,
								languageId: "text",
							},
						],
						{
							title: `Deleted messages in ${message.channel.name}`,
							description: " ",
						},
					);
				} catch {
					return message.channel.send("`❌` An error occurred, please try again!");
				}

				const embed = new MessageEmbed().setDescription(`[\`📄 View\`](${response.url})`).setColor("RED");
				channel.send(
					`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` 🗑️ **${message.author.username}**#${message.author.discriminator} cleared \`${amount}\` messages in ${message.channel}`,
					embed,
				);
			});
		}
		message.channel.bulkDelete(amount + 1, true);

		await message.channel
			.send(`\`✔️\` Successfully cleared \`${amount}\`messages`)
			.then((msg) => msg.delete({ timeout: 5000 }));
	},
};
