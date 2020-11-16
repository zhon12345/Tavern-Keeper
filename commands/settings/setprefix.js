const Guild = require("../../models/guild");

module.exports = {
	name: "setprefix",
	category: "Settings",
	description: "Change the bot's prefix for the server.",
	aliases: ["prefix"],
	usage: "setprefix <prefix>",
	userperms: ["ADMINISTRATOR"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args, prefix) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			return message.channel.send(
				`The prefix for **${message.guild}** has been set to \`${settings ? settings.prefix : prefix}\`.`,
			);
		}

		if(args[0] === settings ? settings.prefix : prefix) {
			return message.channel.send(
				"<:vWarning:725276167346585681> That prefix is already in use.",
			);
		}

		if(args[0].length > 3) {
			return message.channel.send(
				"<:vError:725270799124004934> Prefixes are not allowed to be more than 3 characters",
			);
		}

		await settings.updateOne({
			prefix: args[0],
		});

		return message.channel.send(
			`<:vSuccess:725270799098970112> My prefix has been set to \`${args[0]}\``,
		);
	},
};