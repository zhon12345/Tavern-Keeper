const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "backdoor",
	description: "Pure magic",
	usage: "backdoor <server>",
	category: "Owner",
	aliases: ["bd"],
	userperms: ["BOT_OWNER"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const guildId = args[0];
		if(!guildId || isNaN(guildId) || guildId.length > 18) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid guild id.",
			);
		}

		const guild = client.guilds.cache.get(guildId);
		if(!guild) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid guild id.",
			);
		}

		const invitePossiblites = guild.channels.cache.filter(cha => cha.type === "text" && cha.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"));
		if(!invitePossiblites) {
			return message.channel.send(
				"<:vError:725270799124004934> Insufficient Permission! `Create Instant Invite` required.",
			);
		}

		try {
			invitePossiblites.random().createInvite({ unique: true })
				.then(invite => {
					const embed = new MessageEmbed()
						.setColor("BLUE")
						.setDescription(`[Invite](https://discord.gg/${invite.code}) | Code: \`${invite.code}\``);
					return message.channel.send(
						"<:vSuccess:725270799098970112> Successfully found an invite.", embed,
					);
				});
		}
		catch(err) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}
	},
};