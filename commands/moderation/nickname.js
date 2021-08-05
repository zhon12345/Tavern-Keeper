module.exports = {
	name: "nickname",
	category: "Moderation",
	description: "Set the nickname of a specified user.",
	aliases: ["nick"],
	usage: "nickname <user> <nickname>",
	disabled: false,
	userperms: ["MANAGE_NICKNAMES"],
	botperms: ["MANAGE_NICKNAMES"],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				"`❌` User not found, please provide a valid user. (eg. `@zhon12345#8585`)",
			);
		}

		if(member.roles.highest.position >= message.guild.me.roles.highest.position) {
			return await message.channel.send(
				"`❌` The specified member may have the same or higher role than me.",
			);
		}

		const nickname = args.slice(1).join(" ");
		if (!nickname) {
			return message.channel.send(
				"`❌` Nickname not found, please provide a valid nickname.",
			);
		}

		member.setNickname(nickname);
		message.channel.send(
			`\`✔️\` Successfully set **${member.user.tag}**'s nickname to **${nickname}**`,
		);
	},
};