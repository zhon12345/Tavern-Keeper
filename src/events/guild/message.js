const { is_url, is_invite, validatePermissions } = require('../../functions');
const blacklist = require('../../models/blacklist');
const { BOT_PREFIX, BOT_OWNER } = process.env;
const Guild = require('../../models/guild');
const { warn } = require('../../util/warn');
const mongoose = require('mongoose');

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
				prefix: BOT_PREFIX,
				blacklisted: false,
				settings:{
					antiprofanity: false,
					antilinks: false,
					muterole: null,
					memberrole: null,
					modlog: null,
					serverlog: null,
					messagelog: null,
				},
			});

			newGuild.save();
		}
	});

	const prefix = settings ? settings.prefix : 'm!';

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
	}

	if (settings && settings.blacklisted === true) return;

	if (settings && settings.settings.antiprofanity === true) {
		const profanity = [	'fuck', 'shit', 'fucker', 'nigger', 'nigga', 'asshole', 'bitch'];
		for(const word of profanity) {
			if (message.content.includes(word)) {
				const reason = 'Swearing';
				const logs = settings.settings.modlog;
				const channel = message.guild.channels.cache.get(logs);
				if (!channel) return;

				if(!message.member.hasPermission('MANAGE_MESSAGES')) {
					message.delete();
					message.channel.send(
						`${message.author}, you are not allowed to swear in this channel. Hence, you have received a warning.`,
					);

					warn(client, message, channel, reason);
				}
			}
		}
	}

	if (settings && settings.settings.antilinks === true) {
		if(is_url(message.content) || is_invite(message.content) === true) {
			const reason = 'Sending Links';
			const logs = settings.settings.modlog;
			const channel = message.guild.channels.cache.get(logs);
			if (!channel) return;

			if(!message.member.hasPermission('MANAGE_MESSAGES')) {
				message.delete();
				message.channel.send(
					`${message.author}, you are not allowed to send links in this channel. Hence, you have received a warning.`,
				);

				warn(client, message, channel, reason);
			}
		}
	}

	blacklist.findOne({ id : message.author.id }, async (err, data) => {
		if(!data) {
			if (!message.content.startsWith(prefix)) return;
			if (!message.member) message.member = await message.guild.fetchMember(message);

			const args = message.content.slice(prefix.length).split(/ +/g);
			const cmd = args.shift().toLowerCase();

			if (cmd.length === 0) return;

			const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

			if (command) {
				if (command.userperms.length > 0 || command.botperms.length > 0) {
					if (typeof command.userperms === 'string') {
						command.userperms = command.userperms.split();
						validatePermissions(command.userperms);
					}

					for(const permission of command.userperms) {
						if(permission === 'BOT_OWNER' && message.member.id !== BOT_OWNER) {
							return;
						}
						else if(!message.member.hasPermission(permission)) {
							return message.reply(
								`<:vError:725270799124004934> Insufficient Permission! \`${permission}\` required.`,
							);
						}
					}

					if(typeof command.botperms === 'string') {
						command.botperms = command.botperms.split();
						validatePermissions(command.botperms);
					}

					for(const permission of command.botperms) {
						if (!message.member.hasPermission(permission)) {
							return message.channel.send(
								`<:vError:725270799124004934> Insufficient Permission! \`${permission}\` required.`,
							);
						}
					}
				}

				if(!message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
					return message.channel.send(
						'<:vError:725270799124004934> Insufficient Permission! `Use External Emojis` required.',
					);
				}
				command.run(client, message, args, prefix);
			}
		}
	});
};