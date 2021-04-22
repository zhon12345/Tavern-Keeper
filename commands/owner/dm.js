module.exports = {
	name: "dm",
	category: "Owner",
	description: "Direct message a specified user as the bot.",
	aliases: ["message"],
	usage: "dm <text>",
	userperms: ["BOT_OWNER"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const member = message.mentions.users.first() || await client.users.fetch(args[0]);
		if (!member) {
			return message.channel.send(
				"<:vError:725270799124004934> User not found, please provide a valid user. (eg. `@zhon12345#8585`)",
			);
		}

		const text = args.slice(1).join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Text not found, please provide valid text.",
			);
		}

		try{
			member.send(text);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully sent a DM to \`${member.username}#${member.discriminator}\`.`,
			);
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}
	},
};