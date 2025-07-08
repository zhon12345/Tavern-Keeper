const Guild = require("../../models/guild");

module.exports = {
	name: "modlog",
	category: "Settings",
	description: "Sets the Mod Log for the server.",
	aliases: [],
	usage: "modlog <channel>",
	disabled: false,
	userperms: ["ADMINISTRATOR"],
	botperms: [],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
		if (!args[0]) {
			return message.channel.send(
				`Mod Logs for **${message.guild}** has been ${settings.settings.modlog === null ? "`disabled`." : `set to <#${settings.settings.modlog}>.`}`,
			);
		} else if (args[0].toLowerCase() === "off") {
			if (settings.settings.modlog === null) {
				return message.channel.send("`❌` Mod Logs has already been `disabled`.");
			} else {
				await Guild.updateOne({ guildID: message.guild.id }, { "settings.modlog": null });
				message.channel.send("`✔️` Mod Logs is now `disabled`.");
			}
		} else if (channel) {
			await Guild.updateOne({ guildID: message.guild.id }, { "settings.modlog": channel.id });
			message.channel.send(`\`✔️\` Mod Logs has been set to ${channel}`);
		} else {
			return message.channel.send(`\`❌\` Channel not found, please provide a valid channel (eg. ${message.channel}).`);
		}
	},
};
