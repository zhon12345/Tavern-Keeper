module.exports = {
	name: "removerole",
	category: "Moderation",
	description: "Removes a specified role from a specified user.",
	aliases: [],
	usage: "removerole <user> <role>",
	disabled: false,
	userperms: ["MANAGE_ROLES"],
	botperms: ["MANAGE_ROLES"],
	run: async (client, message, args) => {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
		if (!role) {
			return message.channel.send("`❌` Role not found, please provide a valid role. (eg. `@👤 | Member`)");
		}

		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.members.cache.find(
				(x) => x.user.username === args.slice(0).join(" ") || x.user.username === args[0],
			);
		if (!member) {
			return message.channel.send("`❌` User not found, please provide a valid user.");
		}

		if (role.position >= message.guild.me.roles.highest.position) {
			return await message.channel.send("`❌` The specified role may be the same or higher than me.");
		}

		if (member.roles.highest.position >= message.guild.me.roles.highest.position) {
			return await message.channel.send("`❌` The specified member may have the same or higher role than me.");
		}

		if (member.id === message.author.id) {
			return message.channel.send("`❌` You are not allowed to remove roles from yourself.");
		}

		if (member.id === message.guild.owner.id) {
			return message.channel.send("`⚠️` What do they not need?");
		}

		member.roles.remove(role);
		await message.channel
			.send(
				`\`✔️\` Successfully removed \`${role.name}\` from **${member.user.username}**#${member.user.discriminator}`,
			)
			.then(message.delete());
	},
};
