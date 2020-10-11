module.exports = {
	name: 'nickname',
	category: 'Moderation',
	description: 'Set the nickname of a specified user.',
	aliases: ['nick'],
	usage: 'nickname <user> <nickname>',
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_NICKNAMES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `MANAGE_NICKNAMES` required.',
			);
		}

		if(!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `MANAGE_NICKNAMES` required.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.roles.highest.position >= message.guild.me.roles.highest.position) {
			return await message.channel.send(
				'<:vError:725270799124004934> The specified member may have the same or higher role than me.',
			);
		}

		const nickname = args.slice(1).join(' ');
		if (!nickname) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid Please provide a nickname.',
			);
		}

		member.setNickname(nickname);
		message.channel.send(
			`<:vSuccess:725270799098970112> Successfully set **${member.user.tag}**'s nickname to **${nickname}**`,
		);
	},
};