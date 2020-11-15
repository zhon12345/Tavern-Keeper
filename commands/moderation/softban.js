module.exports = {
	name: "softban",
	category: "Moderation",
	description: "Softban a specified user from the server.",
	aliases: [],
	usage: "softban <user> [reason]",
	userperms: ["BAN_MEMBERS"],
	botperms: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid user.",
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed to softban yourself.",
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed to softban me.",
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				"<:vWarning:725276167346585681> Are you trying to get yourself into trouble?",
			);
		}

		let Reason = args.slice(1).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(1).join(" ");
		}

		if (!member.bannable) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed ban this user.",
			);
		}

		try {
			await member.send(`You have been softbanned from ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			await message.channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
		}

		member.ban().then(
			message.guild.members.unban(member.user),
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully softbanned **${member.user.username}**#${member.user.discriminator}\n\`[Reason]\` ${Reason}`,
		).then(message.delete());
	},
};