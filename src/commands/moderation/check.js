const User = require('../../models/user');
const Guild = require('../../models/guild');

module.exports = {
	name: 'check',
	category: 'Moderation',
	description: 'Get the warnings and other info of the message author or a specified user.',
	aliases: ['warnings'],
	usage: 'check [user]',
	guildOnly: true,
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const warns = await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		});

		let warnings = warns.warnings;
		if(!warnings) warnings = 0;

		let muted;
		const mute = settings.settings.muterole;
		if(member.roles.cache.has(mute)) {
			muted = 'Yes';
		}
		else {
			muted = 'No';
		}

		message.channel.send([
			`<:vSuccess:725270799098970112> Moderation information for **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`,
			`❯ 🚩 Strikes: **${warnings}**`,
			`❯ 🔇 Muted: **${muted}**`,
		]);


	},
};