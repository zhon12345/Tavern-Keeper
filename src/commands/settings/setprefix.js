const Guild = require('../../models/guild');

module.exports = {
	name: 'setprefix',
	category: 'Settings',
	description: 'Change the bot\'s prefix for the server.',
	aliases: ['prefix'],
	usage: 'setprefix <prefix>',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ADMINISTRATOR` required.',
			);
		}

		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if(!args[0]) {
			return message.channel.send(
				`The prefix for **${message.guild}** has been set to \`${settings.prefix}\`.`,
			);
		}
		else if(args[0] === settings.prefix) {
			return message.channel.send(
				'<:vWarning:725276167346585681> That prefix is already in use.',
			);
		}
		else if(args[0].length > 3) {
			return message.channel.send(
				'<:vError:725270799124004934> Prefixes are not allowed to be more than 3 characters',
			);
		}
		await settings.updateOne({
			prefix: args[0],
		});

		return message.channel.send(
			`<:vSuccess:725270799098970112> My prefix has been set to \`${args[0]}\``,
		);
	},
};