const moment = require('moment');
const mongoose = require('mongoose');
const { is_url, is_invite } = require('../../functions');
const Guild = require('../../models/guild');
const User = require('../../models/user');

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return;

	const settings = await Guild.findOne({
		guildID: message.guild.id,
	}, (err, guild) => {
		if (err) console.error(err);
		if (!guild) {
			const newGuild = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: message.guild.id,
				guildName: message.guild.name,
				prefix: process.env.BOT_PREFIX,
				blacklisted: false,
				settings:{
					id: mongoose.Types.ObjectId(),
					antilinks: false,
					muterole: null,
					verifyrole: null,
					modlog: null,
					serverlog: null,
					messagelog: null,
				},
				welcomer: {
					id: mongoose.Types.ObjectId(),
					joinchannel: null,
					leavechannel: null,
					jointext: null,
					leavetext: null,
				},
			});

			newGuild.save();
		}
	});

	let prefix;
	if(!settings.prefix) {
		prefix = 'm!';
	}
	else {
		prefix = settings.prefix;
	}

	if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
		message.channel.send(`My current prefix for this guild is \`${prefix}\``);
	}

	if (settings.blacklisted === true) return;

	if (settings.settings.antilinks === true) {
		if(is_url(message.content) || is_invite(message.content) === true) {
			const logs = settings.settings.modlog;
			const channel = message.guild.channels.cache.get(logs);
			if (!channel || channel === null) return;

			if(message.member.hasPermission('MANAGE_MESSAGES')) {
				return;
			}
			else {
				message.delete();
				message.channel.send(
					`${message.author}, you are not allowed to send links in this channel. Hence, you have received a warning.`,
				);

				User.findOne({
					guildID: message.guild.id,
					userID: message.author.id,
				}, async (err, data) => {
					if (err) console.error(err);
					if (!data) {
						const newUser = new User({
							_id: mongoose.Types.ObjectId(),
							guildID: message.guild.id,
							userID: message.author.id,
							warnings: 1,
						});

						newUser.save();

						try {
							await message.author.send(`You have been given 1 strikes in ${message.guild}\n\`[Reason]\` Sending Links in ${message.channel}`);
						}
						catch(err) {
							await channel.send(`<:vError:725270799124004934> Failed to DM **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})`);
						}

						channel.send(
							`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` Sending Links in ${message.channel}`,
						);
					}
					else {
						data.warnings += 1;
						data.save();
						try {
							await message.author.send(`You have been given 1 strikes in ${message.guild}\n\`[Reason]\` Sending Links in ${message.channel}`);
						}
						catch(err) {
							await channel.send(`<:vError:725270799124004934> Failed to DM **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})`);
						}

						channel.send(
							`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` Sending Links in ${message.channel}`,
						);
					}
				});
			}
		}
	}

	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) {
		command.run(client, message, args);
	}
};