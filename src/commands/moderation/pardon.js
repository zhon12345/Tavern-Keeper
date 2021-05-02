const User = require('../../models/user');
const Guild = require('../../models/guild');
const moment = require('moment');

module.exports = {
	name: 'pardon',
	category: 'Moderation',
	aliases: ['delwarn', 'unwarn'],
	usage: 'pardon <user> <number> [reason]',
	description: 'Remove strikes from a specified person.',
	userperms: ['BAN_MEMBERS'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

		if(!member) {
			return message.channel.send(
				'`❌` Please provide a valid user.',
			);
		}

		if(member.user.bot) {
			return message.channel.send(
				'`❌` Bot are not allowed to have strikes',
			);
		}

		if(message.author.id === member.id) {
			return message.channel.send(
				'`❌` You are not allowed to reset your strikes',
			);
		}

		const reason = args[2] ? args.slice(2).join(' ') : 'No reason provided';
		const code = args[1];
		if(!code || code.length !== 5) {
			return message.channel.send(
				'`❌` Please provide a valid code.',
			);
		}

		await User.findOne({
			guildID: message.guild.id,
			userID: member.user.id,
		}, async (err, data) => {
			if(data) {
				data.warnings.splice(data.warnings.findIndex(x => x.code === code), 1);
				data.save();

				try {
					await member.send(`You have been pardoned \`1\` strikes in ${message.guild}\n\`[Reason]\` ${reason}`);
				}
				catch(err) {
					await channel.send(`\`❌\` Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
				}

				if(channel) {
					channel.send(
						`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🏳️ **${message.author.username}**#${message.author.discriminator} pardoned \`1\` strikes from **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${reason}`,
					);
				}

				await message.channel.send(
					`\`✔️\` Successfully pardoned \`1\` strikes from **${member.user.username}**#${member.user.discriminator}`,
				).then(message.delete());
			}
			else {
				return message.channel.send(
					`\`❌\` \`${member.user.tag}\` does not have any warns in ${message.guild.name}`,
				);
			}
		});
	},
};