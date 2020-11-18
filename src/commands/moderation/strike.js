const mongoose = require('mongoose');
const moment = require('moment');
const Guild = require('../../models/guild');
const User = require('../../models/user');

module.exports = {
	name: 'strike',
	category: 'Moderation',
	description: 'Warn a specified user for breaking the rules.',
	aliases: ['warn'],
	usage: 'strike <user> [reason]',
	userperms: ['KICK_MEMBERS'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const code = Math.random().toString(36).slice(-5);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.user.bot) {
			return message.channel.send(
				'<:vError:725270799124004934> Bots are not allowed to have strikes.',
			);
		}

		if(message.author.id === member.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to warn yourself.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			);
		}

		const reason = args[1] ? args.slice(1).join(' ') : 'No reason provided';

		await User.findOne({
			guildID: message.guild.id,
			userID: member.user.id,
		}, async (err, data) => {
			if (!data) {
				const newUser = new User({
					_id: mongoose.Types.ObjectId(),
					guildName: message.guild.name,
					username: member.user.username,
					guildID: message.guild.id,
					userID: member.user.id,
					warnings: [
						{
							code: code,
							moderator: message.author.tag,
							moderatorID: message.author.id,
							reason: reason,
						},
					],
				});
				newUser.save();

				try {
					await member.send(`You have been given \`1\` strikes in ${message.guild}\n\`[Reason]\` ${reason}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
				}

				if(channel) {
					channel.send(
						`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${message.author.username}**#${message.author.discriminator} gave \`1\` strikes to **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}).**${message.author.username}** has 1	 strikes now.\n\`[Reason]\` ${reason}`,
					);
				}

				await message.channel.send(
					`<:vSuccess:725270799098970112> Successfully gave \`1\` strikes to **${member.user.username}**#${member.user.discriminator}`,
				).then(message.delete());
			}
			else {
				data.warnings.push(
					{
						code: code,
						moderator: message.author.tag,
						moderatorID: message.author.id,
						reason: reason,
					},
				);
				data.save();

				try {
					await member.send(`You have been given \`1\` strikes in ${message.guild}\n\`[Reason]\` ${reason}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
				}

				if(channel) {
					channel.send(
						`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${message.author.username}**#${message.author.discriminator} gave \`1\` strikes to **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}).**${message.author.username}** has ${data.warnings.length} strikes now.\n\`[Reason]\` ${reason}`,
					);
				}

				await message.channel.send(
					`<:vSuccess:725270799098970112> Successfully gave \`1\` strikes to **${member.user.username}**#${member.user.discriminator}`,
				).then(message.delete());
			}
		});
	},
};