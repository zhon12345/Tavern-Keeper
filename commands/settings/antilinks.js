const Guild = require("../../models/guild");

module.exports = {
	name: "antilinks",
	category: "Settings",
	description: "Toggle the antilinks feature on/off.",
	aliases: ["antilink"],
	usage: "antilinks <on/off>",
	disabled: false,
	userperms: ["ADMINISTRATOR"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			return message.channel.send(
				`Anti Links for **${message.guild}** has been \`${settings.settings.antilinks ? "enabled" : "disabled"}\`.`,
			);
		}
		else if (args[0].toLowerCase() === "off") {
			if(settings.settings.antilinks === false) {
				return message.channel.send(
					"`❌` Anti Links has already been `disabled`.",
				);
			}
			else {
				await Guild.updateOne(
					{ guildID: message.guild.id },
					{ "settings.antilinks": false },
				);
				message.channel.send(
					"`✔️` Anti Links is now `disabled`",
				);
			}
		}
		else if (args[0].toLowerCase() === "on") {
			if(settings.settings.antilinks === true) {
				return message.channel.send(
					"`❌` Anti Links has already been `enabled`.",
				);
			}
			else {
				await Guild.updateOne(
					{ guildID: message.guild.id },
					{ "settings.antilinks": true },
				);
				message.channel.send(
					"`✔️` Anti Links is now `enabled`",
				);
			}
		}
		else {
			return message.channel.send(
				"`❌` Valid argument not found, please provide valid arguments (eg. `on`).",
			);
		}
	},
};