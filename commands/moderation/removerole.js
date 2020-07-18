module.exports = {
	name: 'removerole',
	category: 'Moderation',
	description: 'Removes a specified role from a specified user.',
	aliases: [],
	usage: 'removerole <user> <role>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Manage Roles.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				'<:vError:725270799124004934> I must have the following permissions to use that: Manage Roles.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
		if(!role) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid role.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to remove roles from yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> What do you want to remove?',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		member.roles.remove(role);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully removed ${role.name} from **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};