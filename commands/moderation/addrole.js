module.exports = {
	name: "addrole",
	category: "Moderation",
	description: "Adds a role to a specified user.",
	aliases: [],
	usage: "addrole <user> <role>",
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
			return message.channel.send("`❌` You are not allowed to give yourself roles.");
		}

		if (member.id === message.guild.owner.id) {
			return message.channel.send("`⚠️` What more do they need?");
		}

		member.roles.add(role);
		await message.channel
			.send(`\`✔️\` Successfully gave \`${role.name}\` to **${member.user.username}**#${member.user.discriminator}`)
			.then(message.delete());
	},
};
