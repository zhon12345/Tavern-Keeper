const Guild = require("../../models/guild");

module.exports = {
	name: "serverlog",
	category: "Settings",
	description: "Sets the Server Log for the server.",
	aliases: [],
	usage: "serverlog <channel>",
	disabled: false,
	userperms: ["ADMINISTRATOR"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
		if (!args[0]) {
			return message.channel.send(
				`Server Logs for **${message.guild}** has been ${settings.settings.serverlog === null ? "`disabled`." : `set to <#${settings.settings.serverlog}>.`}`,
			);
		}
		else if (args[0].toLowerCase() === "off") {
			if(settings.settings.serverlog === null) {
				return message.channel.send(
					"`❌` Server Logs has already been `disabled`.",
				);
			}
			else {
				await Guild.updateOne(
					{ guildID:message.guild.id },
					{ "settings.serverlog": null },
				);
				message.channel.send(
					"`✔️` Server logs is now `disabled`",
				);
			}
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
		else {
			return message.channel.send(
				`\`❌\` Channel not found, please provide a valid channel (eg. ${message.channel}).`,
			);
		}
	},
};