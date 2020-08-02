module.exports = {
	name: 'nickname',
	category: 'Moderation',
	description: 'Set the nickname of a specified user.',
	aliases: ['nick'],
	usage: 'nickname <user> <nickname>',
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_NICKNAMES')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Manage Nickname.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
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
			`<:vSuccess:725270799098970112> Successfully set **${member.user.tag}'s nickname to ${nickname}**`,
		);
	},
};