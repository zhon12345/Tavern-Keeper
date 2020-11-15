module.exports = {
	name: "unban",
	category: "Moderation",
	description: "Unban a specified user from the server.",
	aliases: [],
	usage: "unban <user> [reason]",
	userperms: ["BAN_MEMBERS"],
	botperms: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
	run: async (client, message, args) => {
		const id = args[0];
		if(!id || isNaN(id)) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid user id.",
			);
		}

		const bannedUsers = await message.guild.fetchBans();
		const user = bannedUsers.get(id);
		if (!user) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid user id.",
			);
		}

		let Reason = args.slice(1).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(1).join(" ");
		}

		message.guild.members.unban(user.user);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully unbanned **${user.user.username}**#${user.user.discriminator}\n\`[Reason]\` ${Reason}`,
		).then(message.delete());
	},
};