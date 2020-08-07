/* eslint-disable no-inner-declarations */
const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions');
const { BOT_OWNER } = process.env;
const Guild = require('../../models/guild');

module.exports = {
	name: 'help',
	aliases: ['h', 'commands'],
	category: 'Info',
	description: 'Returns all commands, or one specific command info.',
	usage: 'help [command]',
	run: async (client, message, args) => {
		if (args[0]) {
			return getCMD(client, message, args[0]);
		}
		else {
			return getAll(client, message);
		}
	},
};

async function getAll(client, message) {
	const settings = await Guild.findOne({
		guildID: message.guild.id,
	}, (err) => {
		if (err) console.error(err);
	});

	const prefix = settings.prefix;
	const embed = new MessageEmbed()
		.setTitle(`${client.user.username}'s Commands`)
		.setFooter(`Requested by ${message.author.tag} `)
		.setTimestamp()
		.setColor('BLUE')
		.setDescription([`
		This server's prefix is \`${prefix}\`.
		For more info on a specific command, type \`${prefix}help <command>\`.
		Visit the bot's website [here](https://tavern-keeper.weebly.com/) for more info on certain features.
		`]);

	let categories;
	if(!message.channel.nsfw) {
		categories = [...new Set(client.commands.filter(cmd => cmd.category !== 'NSFW' && 'Owner').map(cmd =>cmd.category))];
	}
	else if(message.author.id !== BOT_OWNER) {
		categories = [...new Set(client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd =>cmd.category))];
	}
	else {
		categories = [...new Set(client.commands.map(cmd => cmd.category))];
	}

	for (const id of categories) {
		const category = client.commands.filter(cmd => cmd.category === id);

		embed.addField(`${id} (${category.size})`, category.map(cmd => `\`${cmd.name}\``).join(' '));
	}
	return message.channel.send(embed);
}

async function getCMD(client, message, input) {
	const settings = await Guild.findOne({
		guildID: message.guild.id,
	}, (err) => {
		if (err) console.error(err);
	});

	const prefix = settings.prefix;
	const embed = new MessageEmbed();

	const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

	const info = `No information found for command ${input.toLowerCase()}`;

	if (!cmd) {
		return message.channel.send(embed.setColor('BLUE').setDescription(info));
	}
	else{
		const hembed = new MessageEmbed()
			.setTitle(`Information for ${capitalizeFirstLetter(cmd.name.toString().toLowerCase())} command`)
			.setColor('BLUE')
			.setTimestamp()
			.setFooter('Syntax: <> = required, [] = optional', `${client.user.avatarURL()}`)
			.setDescription([
				`**❯ Name:** ${cmd.name}`,
				`**❯ Category:** ${capitalizeFirstLetter(cmd.category.toString().toLowerCase())}`,
				`**❯ Description:** ${cmd.description}`,
				`**❯ Usage:** ${prefix}${cmd.usage}`,
				`**❯ Aliases:** ${cmd.aliases ? cmd.aliases.map((a) => `\`${a}\``).join(', ') : '`None`'}`,
			]);
		message.channel.send(hembed);
	}
}