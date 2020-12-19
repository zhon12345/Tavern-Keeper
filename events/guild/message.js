const { isURL, isInvite, validatePermissions } = require("../../functions");
const { BOT_PREFIX, BOT_OWNER } = process.env;
const Guild = require("../../models/guild");
const mongoose = require("mongoose");

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return;

	const settings = await Guild.findOne({
		guildID: message.guild.id,
	}, (err, guild) => {
		if (!guild) {
			const newGuild = new Guild({
				_id: mongoose.Types.ObjectId(),
				guildID: message.guild.id,
				guildName: message.guild.name,
				prefix: BOT_PREFIX,
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

	const prefix = settings ? settings.prefix : BOT_PREFIX;

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
	}

	if (settings && settings.settings.antilinks) {
		if(isURL(message.content) || isInvite(message.content)) {
			if(!message.member.hasPermission("KICK_MEMBERS")) {
				message.delete().then(() => {
					message.channel.send(
						`${message.author}, you are not allowed to send links here.`,
					);
				});
			}
		}
	}

	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	if (command) {
		if (command) {
			if (client.cooldowns.has(message.author.id)) {
				return message.channel.send(`Hey ${message.author}, slow down, take a chill pill!`);
			}

			client.cooldowns.add(message.author.id);
			setTimeout(() => {
				client.cooldowns.delete(message.author.id);
			}, 2000);
		}

		if (command.userperms.length > 0 || command.botperms.length > 0) {
			if (typeof command.userperms === "string") {
				command.userperms = command.userperms.split();
				validatePermissions(command.userperms);
			}

			if(message.author.id !== BOT_OWNER) {
				for(const permission of command.userperms) {
					if(permission === "BOT_OWNER" && message.member.id !== BOT_OWNER) {
						return;
					}
					else if(!message.member.hasPermission(permission)) {
						return message.channel.send(
							`<:vError:725270799124004934> Insufficient Permission! \`${permission}\` required.`,
						);
					}
				}
			}

			if(typeof command.botperms === "string") {
				command.botperms = command.botperms.split();
				validatePermissions(command.botperms);
			}

			for(const permission of command.botperms) {
				if (!message.guild.me.hasPermission(permission)) {
					return message.channel.send(
						`<:vError:725270799124004934> Insufficient Permission! I require \`${permission}\`.`,
					);
				}
			}
		}
		command.run(client, message, args, prefix);
	}
};