const warns = require ('../../models/warns');
const { prefix } = process.env;

module.exports = {
	name: 'clearwarns',
	aliases: ['pardon'],
	category: 'Moderation',
	description: 'Remove a warning from a user.',
	usage: `${prefix}clearwarn <@user> <reason>`,
	run: async (client, message, args) => {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'You do not have the permission to use this commnad.',
			);
		}

		const user = message.mentions.users.first();
		if (!user) {
			return message.channel.send(
				'You did not specify a user to pardon.',
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
					return message.channel.send(
						`${user.tag} do not have any warns.`,
					);
				}
				else{
					data.delete();
					message.channel.send(
						`${user.tag} has been pardoned with the reason of ${args
							.slice(1)
							.join(' ')}. They now have 0 warns.`,
					);
				}
			},
		);
	},
};