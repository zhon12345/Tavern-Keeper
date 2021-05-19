const { isURL, isInvite, validatePermissions } = require('../../functions');
const { BOT_PREFIX, BOT_OWNER, BOT_COMMAND_LOG } = process.env;
const blacklist = require('../../models/blacklist');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');
const sourcebin = require('sourcebin_js');
const mongoose = require('mongoose');

module.exports = async (client, message) => {
	if (!message.guild) return;
	if (message.author.bot) return;

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

	const prefix = settings ? settings.prefix : 'm!';

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		const m = new MessageEmbed()
			.setDescription(`Hello there! My prefix for **${message.guild.name}** is \`${prefix}\`. To get stated, run \`${prefix}help\`! To change my prefix, run \`${prefix}setprefix <prefix>\``)
			.addField('Links:', '[Discord server](https://discord.gg/jMpw3jw) | [Bot invite](https://discord.com/oauth2/authorize?client_id=722054700308103200&scope=bot&permissions=490056959)')
			.setColor('BLUE');
		message.channel.send(m);
	}

	if (settings && settings.settings.antiprofanity === true) {
		const profanity = [	'fuck', 'shit', 'fucker', 'nigger', 'nigga', 'asshole', 'bitch'];
		for(const word of profanity) {
			if (message.content.includes(word)) {
				if(!message.member.hasPermission('MANAGE_MESSAGES')) {
					message.delete();
					message.channel.send(
						`${message.author}, you are not allowed to swear in this channel. Hence, you have received a warning.`,
					);
				}
			}
		}
	}

	if (settings && settings.settings.antilinks === true) {
		if(isURL(message.content) || isInvite(message.content) === true) {
			if(!message.member.hasPermission('MANAGE_MESSAGES')) {
				message.delete();
				message.channel.send(
					`${message.author}, you are not allowed to send links in this channel. Hence, you have received a warning.`,
				);
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

			if (command && command.disabled === false) {
				if (client.cooldowns.has(message.author.id)) {
					return message.channel.send(`Hey ${message.author}, slow down, take a chill pill!`);
				}

				client.cooldowns.add(message.author.id);
				setTimeout(() => {
					client.cooldowns.delete(message.author.id);
				}, 2000);

				if (command.userperms.length > 0 || command.botperms.length > 0) {
					if (typeof command.userperms === 'string') {
						command.userperms = command.userperms.split();
						validatePermissions(command.userperms);
					}

					if(message.author.id !== BOT_OWNER) {
						for(const permission of command.userperms) {
							if(permission === 'BOT_OWNER' && message.member.id !== BOT_OWNER) {
								return;
							}
							else if(!message.member.hasPermission(permission)) {
								return message.reply(
									`\`❌\` Insufficient Permission! \`${permission}\` required.`,
								);
							}
						}
					}

					if(typeof command.botperms === 'string') {
						command.botperms = command.botperms.split();
						validatePermissions(command.botperms);
					}

					for(const permission of command.botperms) {
						if (!message.member.hasPermission(permission)) {
							return message.channel.send(
								`\`❌\` Insufficient Permission! \`${permission}\` required.`,
							);
						}
					}
				}

				if(message.content.length > 512) {
					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: message.content,
								languageId: 'text',
							},
						], {
							title: 'Message Content',
							description: ' ',
						});
					}
					catch (e) {
						return message.channel.send('`❌` An error occurred, please try again!');
					}

					const embed = new MessageEmbed()
						.setColor('BLUE')
						.addField(`<:documents:773950876347793449>  A command was used in ${message.guild.name} (ID: ${message.guild.id}) ❯`, [
							`> **<:card:773965449402646549> Username: \`${message.author.tag}\`**`,
							`> **\\📇 User ID: \`${message.author.id}\`**`,
							`> **<:hashtag:774084894409883648> Channel Name: \`${message.channel.name}\`**`,
							`> **\\📥 Command: \`${command.name}\`**`,
							`> **\\💬 Message Content: [\`${response.url}\`](${response.url})**`,
						])
						.setTimestamp();
					await client.channels.cache.get(BOT_COMMAND_LOG).send(embed);
				}

				const embed = new MessageEmbed()
					.setColor('BLUE')
					.addField(`<:documents:773950876347793449>  A command was used in ${message.guild.name} (ID: ${message.guild.id}) ❯`, [
						`> **<:card:773965449402646549> Username: \`${message.author.tag}\`**`,
						`> **\\📇 User ID: \`${message.author.id}\`**`,
						`> **<:hashtag:774084894409883648> Channel Name: \`${message.channel.name}\`**`,
						`> **\\📥 Command: \`${command.name}\`**`,
						`> **\\💬 Message Content: \`${message.content}\`**`,
					])
					.setTimestamp();
				await client.channels.cache.get(BOT_COMMAND_LOG).send(embed);

				command.run(client, message, args, prefix);
			}
			else {
				message.channel.send(
					'`⚠️` This command has been disabled for the time being. Please try again later.',
				);
			}
		}
	});
};