const { validatePermissions } = require("../../functions");
const { BOT_PREFIX, BOT_OWNER } = process.env;

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return;

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		message.channel.send(`${message.guild.name}'s prefix is \`${BOT_PREFIX}\``);
	}

	if (!message.content.startsWith(BOT_PREFIX)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(BOT_PREFIX.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	if (command) {
		if (command.userperms.length > 0 || command.botperms.length > 0) {
			if (typeof command.userperms === "string") {
				command.userperms = command.userperms.split();
				validatePermissions(command.userperms);
			}

			for(const permission of command.userperms) {
				if(permission === "BOT_OWNER" && message.member.id !== BOT_OWNER) {
					return;
				}
				else if(!message.member.hasPermission(permission)) {
					return message.reply(
						`<:vError:725270799124004934> Insufficient Permission! \`${permission}\` required.`,
					);
				}
			}

			if(typeof command.botperms === "string") {
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

		if(!message.guild.me.hasPermission("USE_EXTERNAL_EMOJIS")) {
			return message.channel.send(
				"<:vError:725270799124004934> Insufficient Permission! `Use External Emojis` required.",
			);
		}
		command.run(client, message, args);
	}
};