const db = require('quick.db');

module.exports = async (client, message) => {
	let prefix;
	const prefixes = db.fetch(`prefix_${message.guild.id}`);
	if(prefixes == null) {
		prefix = 'm!';
	}
	else {
		prefix = prefixes;
	}

	if (message.author.bot) return;
	if (!message.guild) return;

	if(message.content === `<@${client.user.id}>`) {
		return message.channel.send(`My current prefix for this guild is \`${prefix}\``);
	}

	if(message.content === `<@!${client.user.id}>`) {
		return message.channel.send(`My current prefix for this guild is \`${prefix}\``);
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