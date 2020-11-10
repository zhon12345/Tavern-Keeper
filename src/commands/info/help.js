/* eslint-disable no-inner-declarations */
const { MessageEmbed } = require('discord.js');
const { BOT_OWNER } = process.env;
const Guild = require('../../models/guild');

module.exports = {
	name: 'help',
	aliases: ['commands'],
	category: 'Info',
	description: 'Returns the help page, or one specific command info.',
	usage: 'help [command/category]',
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		if (message.author.id === BOT_OWNER && args[0] === 'all') {
			const categories = [...new Set(client.commands.map(cmd => cmd.category))];
			const embed = new MessageEmbed()
				.setTitle(`${client.user.username}'s Commands`)
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setColor('BLUE')
				.setDescription([`
			This server's prefix is \`${settings.prefix}\`.
			For more info on a specific command, type \`${settings.prefix}help <command>\`.
			Visit the bot's website [here](https://tavern-keeper.weebly.com/) for more info on certain features.
			`]);

			for (const id of categories) {
				const category = client.commands.filter(cmd => cmd.category === id);

				embed.addField(`${id} (${category.size})`, category.map(cmd => `\`${cmd.name}\``).join(' '));
			}
			return message.channel.send(embed);
		}
		else if (args[0]) {
			const category = client.category.get(args[0].toLowerCase());
			const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

			if (category) {
				if (args[0].toLowerCase() === 'owner' && message.author.id !== BOT_OWNER) return;
				if (args[0].toLowerCase() === 'nsfw' && !message.channel.nsfw) return;
				const cembed = new MessageEmbed()
					.setTitle(`${category.category} Commands`)
					.setDescription(client.commands.filter(cmds => cmds.category.toLowerCase() === args[0].toLowerCase()).map(cmds => `\`${cmds.name}\``).join(' '))
					.setColor('BLUE')
					.setFooter(`Requested by ${message.author.tag} `)
					.setTimestamp();
				return message.channel.send(cembed);
			}
			else if (cmd) {
				if (cmd.category.toLowerCase() === 'owner' && message.author.id !== BOT_OWNER) return;
				if (cmd.category.toLowerCase() === 'nsfw' && !message.channel.nsfw) return;
				const hembed = new MessageEmbed()
					.setTitle(`Information for ${cmd.name.toString().toLowerCase()} command`)
					.setColor('BLUE')
					.setTimestamp()
					.setFooter('Syntax: <> = required, [] = optional', `${client.user.avatarURL()}`)
					.setDescription([
						`> **Name: \`${cmd.name}\`**`,
						`> **Category: \`${cmd.category.toString()}\`**`,
						`> **Description: \`${cmd.description}\`**`,
						`> **Usage: \`${settings.prefix}${cmd.usage}\`**`,
						`> **Aliases: \`${cmd.aliases.length ? cmd.aliases.map((a) => `${a}`).join('`, `') : 'None'}\`**`,
					]);
				return message.channel.send(hembed);
			}
		}
		else {
			const embed = new MessageEmbed()
				.setTitle(`${client.user.username}'s Commands`)
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setColor('BLUE')
				.setDescription([`
				This server's prefix is \`${settings.prefix}\`.
				For more info on a specific command, type \`${settings.prefix}help <command>\`.
				Visit the bot's website [here](https://tavern-keeper.weebly.com/) for more info on certain features.
				`]);

			const categories = [...new Set(client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category))];
			for (const id of categories) {
				const category = client.commands.filter(cmd => cmd.category === id);

				embed.addField(`${id} (${category.size})`, `\`${settings.prefix}help ${id.toLowerCase()}\``, true);
			}
			message.channel.send(embed);
		}
	},
};