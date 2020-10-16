const { is_url, is_invite } = require('../../functions');
const Guild = require('../../models/guild');
const { warn } = require('../../util/warn');
const mongoose = require('mongoose');
const { BOT_PREFIX } = process.env;

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
					id: mongoose.Types.ObjectId(),
					antiprofanity: false,
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

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
	}

	if (settings.blacklisted === true) return;

	if (settings.settings.antiprofanity === true) {
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

	if (settings.settings.antilinks === true) {
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

	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	if (command) {
		if(!message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `Use External Emojis` required.',
			);
		}
		if(!message.guild.me.hasPermission('EMBED_LINKS')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `Embed Links` required.',
			);
		}
		command.run(client, message, args);
	}
};