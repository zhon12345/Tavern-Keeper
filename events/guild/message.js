const prefix = process.env.BOT_PREFIX;

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return;

	if (message.content.match(`^<@!?${client.user.id}>( |)$`)) {
		message.channel.send(`${message.guild.name}'s prefix is \`${prefix}\``);
	}

	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.fetchMember(message);

	const args = message.content.slice(prefix.length).split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

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