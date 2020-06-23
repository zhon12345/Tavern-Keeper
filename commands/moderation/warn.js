const warns = require ('../../models/warns');
const { prefix } = process.env;

module.exports = {
	name: 'warn',
	aliases: ['strike'],
	category: 'Moderation',
	description: 'Give a user a warning for breaking the rules.',
	usage: `${prefix}warn <@user> <reason>`,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			);
		}

		const user = message.mentions.users.first();
		if (!user) {
			return message.channel.send(
				'You did not specify a user to warn.',
			);
		}
		if (!args.slice(1).join(' ')) {
			return message.channel.send(
				'You did not specify a reason.',
			);
		}
		warns.findOne(
			{ Guild: message.guild.id, User: user.id },
			async (err, data) => {
				if (err) console.log(err);
				if (!data) {
					const newWarns = new warns({
						User: user.id,
						Guild: message.guild.id,
						Warns: [
							{
								Moderator: message.author.id,
								Reason: args.slice(1).join(' '),
							},
						],
					});
					newWarns.save();
					message.channel.send(
						`${user.tag} has been warned with the reason of ${args
							.slice(1)
							.join(' ')}. They now have 1 warn.`,
					);
				}
				else {
					data.Warns.unshift({
						Moderator: message.author.id,
						Reason: args.slice(1).join(' '),
					});
					data.save();
					message.channel.send(
						`${user.tag} has been warned with the reason of ${args
							.slice(1)
							.join(' ')}. They now have ${data.Warns.length} warns.`,
					);
				}
			},
		);
	},
};