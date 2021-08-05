const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "backdoor",
	description: "Pure magic",
	usage: "backdoor <server>",
	category: "Owner",
	aliases: ["bd"],
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message, args) => {
		const guildId = args[0];
		if(!guildId || isNaN(guildId) || guildId.length > 18) {
			return message.channel.send(
				"`❌` Guild ID not found, please provide a valid guild id. (eg. `450846546867519503`)",
			);
		}

		const guild = client.guilds.cache.get(guildId);
		if(!guild) {
			return message.channel.send(
				"`❌` Guild ID not found, please provide a valid guild id. (eg. `450846546867519503`)",
			);
		}

		const invitePossiblites = guild.channels.cache.filter(cha => cha.type === "text" && cha.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"));
		if(!invitePossiblites) {
			return message.channel.send(
				"`❌` Insufficient Permission! `Create Instant Invite` required.",
			);
		}

		try {
			invitePossiblites.random().createInvite({ unique: true })
				.then(invite => {
					const embed = new MessageEmbed()
						.setColor("BLUE")
						.setDescription(`[Invite](https://discord.gg/${invite.code}) | Code: \`${invite.code}\``);
					return message.channel.send(
						"`✔️` Successfully found an invite.", embed,
					);
				});
		}
		catch(err) {
			return message.channel.send(
				"`❌` An error occurred, please try again!",
			);
		}
	},
};