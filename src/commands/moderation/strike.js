const mongoose = require('mongoose');
const moment = require('moment');
const Guild = require('../../models/guild');
const User = require('../../models/user');

module.exports = {
	name: 'strike',
	category: 'Moderation',
	description: 'Warn a specified user for breaking the rules.',
	aliases: ['warn'],
	usage: 'strike <user> [amount] [reason]',
	userperms: ['KICK_MEMBERS'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;

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

		let Reason;
		let amount;
		if (isNaN(args[1])) {
			amount = 1;
			Reason = args.slice(1).join(' ');
			if (!Reason) {
				Reason = 'No reason provided';
			}
			else {
				Reason = args.slice(1).join(' ');
			}
		}
		else {
			amount = Number(args[1]);
			Reason = args.slice(2).join(' ');
			if (!Reason) {
				Reason = 'No reason provided';
			}
			else {
				Reason = args.slice(2).join(' ');
			}
		}

		await User.findOne({
			guildID: message.guild.id,
			userID: member.id,
		}, async (data) => {
			if (!data) {
				const newUser = new User({
					_id: mongoose.Types.ObjectId(),
					guildID: message.guild.id,
					userID: member.id,
					warnings: amount,
				});

				newUser.save();

				try {
					await member.send(`You have been given \`${amount}\` strikes in ${message.guild}\n\`[Reason]\` ${Reason}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
				}

				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${message.author.username}**#${message.author.discriminator} gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}).**${message.author.username}** has ${amount} strikes now.\n\`[Reason]\` ${Reason}`,
				);
				await message.channel.send(
					`<:vSuccess:725270799098970112> Successfully gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator}`,
				).then(message.delete());
			}
			else {
				data.warnings += amount;
				data.save();
				try {
					await member.send(`You have been given \`${amount}\` strikes in ${message.guild}\n\`[Reason]\` ${Reason}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
				}

				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${message.author.username}**#${message.author.discriminator} gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}).**${message.author.username}** has ${data.warnings} strikes now.\n\`[Reason]\` ${Reason}`,
				);
				await message.channel.send(
					`<:vSuccess:725270799098970112> Successfully gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator}`,
				).then(message.delete());
			}
		});
	},
};