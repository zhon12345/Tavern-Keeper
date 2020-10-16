module.exports = {
	name: 'removerole',
	category: 'Moderation',
	description: 'Removes a specified role from a specified user.',
	usage: 'removerole <user> <role>',
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `MANAGE_ROLES` required.',
			);
		}

		if(!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `MANAGE_ROLES` required.',
			);
		}

		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
		if(!role) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid role.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(role.position >= message.guild.me.roles.highest.position) {
			return await message.channel.send(
				'<:vError:725270799124004934> The specified role may be the same or higher than me.',
			);
		}

		if(member.roles.highest.position >= message.guild.me.roles.highest.position) {
			return await message.channel.send(
				'<:vError:725270799124004934> The specified member may have the same or higher role than me.',
			);
		}


		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to remove roles from yourself.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> What do you want to remove?',
			);
		}

		member.roles.remove(role);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully removed ${role.name} from **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};