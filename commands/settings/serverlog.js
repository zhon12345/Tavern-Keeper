const Guild = require("../../models/guild");

module.exports = {
	name: "serverlog",
	category: "Settings",
	description: "Sets the serverlogs channel for the server.",
	aliases: [],
	usage: "serverlog <channel>",
	disabled: false,
	userperms: ["ADMINISTRATOR"],
	botperms: [],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
		if (args[0] === "off") {
			await Guild.updateOne(
				{ guildID:message.guild.id },
				{ "settings.serverlog": null },
			);
			message.channel.send(
				"`✔️` Server logs has been `disabled`",
			);
		}
		else if(channel) {
			await Guild.updateOne(
				{ guildID: message.guild.id },
				{ "settings.serverlog": channel.id },
			);
			message.channel.send(
				`\`✔️\` Server logs has been set to ${channel}`,
			);
		}
		else if(settings.settings.serverlog === null) {
			return message.channel.send(
				`Server Logs for **${message.guild}** has been \`disabled\`.`,
			);
		}
		else {
			return message.channel.send(
				`Server Logs for **${message.guild}** has been set to <#${settings.settings.serverlog}>.`,
			);
		}
	},
};