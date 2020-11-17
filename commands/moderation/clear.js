const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");
const url = "https://hasteb.in/documents";
const fetch = require("node-fetch");
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

		channel.messages.fetch({ limit: amount + 1 }).then(async (messages) => {
			const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString("en-US")} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join("\n");

			let response;
			try {
				response = await fetch(url, { method: "POST", body: output, headers: { "Content-Type": "text/plain" } }).then(res => res.json());
			}
			catch(e) {
				return message.channel.send("An error occured, please try again!");
			}

			const embed = new MessageEmbed()
				.setDescription(`[\`📄 View\`](https://hasteb.in/${response.key}.js)`)
				.setColor("GREEN");
			channel.send(
				`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` 🗑️ **${message.author.username}**#${message.author.discriminator} cleared \`${amount}\` messages in ${message.channel}`, embed,
			);
		}).then(() => {
			message.channel.bulkDelete(amount + 1, true);
		});

		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully cleared \`${amount}\`messages`,
		).then(msg => msg.delete({ timeout: 5000 }));
	},
};