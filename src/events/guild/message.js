const db = require('quick.db');
const moment = require('moment');
const { is_url, is_invite } = require('../../functions');
const mongoose = require('mongoose');
const Guild = require('../../models/guild');
const Blacklist = require('../../models/blacklist');

module.exports = async (client, message) => {
	await Blacklist.findOne({
		guildID: message.guild.id,
	}, (err, guild) => {
		if (err) console.error(err);
		if (guild.guildID === message.guild.id) {
			return;
		}
	});
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
				settings:{
					id: mongoose.Types.ObjectId(),
					modlog: null,
					serverlog: null,
					messagelog: null,
					antilinks: false,
				},
			});

			newGuild.save();

			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
	});

	let prefix;
	if(!settings.prefix) {
		prefix = 'm!';
	}
	else {
		prefix = settings.prefix;
	}

	if(message.content === `<@${client.user.id}>`) {
		return message.channel.send(`My current prefix for this guild is \`${prefix}\``);
	}

	if(message.content === `<@!${client.user.id}>`) {
		return message.channel.send(`My current prefix for this guild is \`${prefix}\``);
	}

	const antilinks = settings.antilinks;
	if (antilinks === true) {
		if(is_url(message.content) || is_invite(message.content) === true) {
			if(message.member.hasPermission('MANAGE_MESSAGES')) {
				return;
			}
			else {
				message.delete();
				message.channel.send(
					`${message.author}, you are not allowed to send links in this channel. Hence, you have received a warning.`,
				);

				const warnings = db.get(`warnings_${message.guild.id}_${message.author.id}`);

				if(warnings <= 0) {
					try {
						await message.author.send(`You have been given 1 strikes in ${message.guild}\n\`[Reason]\` Sending Links in ${message.channel}`);
					}
					catch(err) {
						await channel.send(`<:vError:725270799124004934> Failed to DM **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})`);
					}

					db.set(`warnings_${message.guild.id}_${message.author.id}`, 1);
					const logs = settings.settings.modlog;
					const channel = message.guild.channels.cache.get(logs);
					channel.send(
						`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` Sending Links in ${message.channel}`,
					);
				}
				else {
					try {
						await message.author.send(`You have been given 1 strikes in ${message.guild}\n\`[Reason]\` Sending Links in ${message.channel}`);
					}
					catch(err) {
						await channel.send(`<:vError:725270799124004934> Failed to DM **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})`);
					}

					db.add(`warnings_${message.guild.id}_${message.author.id}`, 1);
					const logs = settings.settings.modlog;
					const channel = message.guild.channels.cache.get(logs);
					if (!channel) return;
					channel.send(
						`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` Sending Links in ${message.channel}`,
					);
				}
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