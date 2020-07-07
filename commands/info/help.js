/* eslint-disable no-inner-declarations */
const { MessageEmbed } = require('discord.js');
const { ownerid } = process.env;
const db = require('quick.db');

module.exports = {
	name: 'help',
	aliases: ['h', 'commands'],
	category: 'Info',
	description: 'Returns all commands, or one specific command info',
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

function getAll(client, message) {
	let prefix;
	const prefixes = db.fetch(`prefix_${message.guild.id}`);
	if(prefixes == null) {
		prefix = 'm!';
	}
	else {
		prefix = prefixes;
	}
	const embed = new MessageEmbed()
		.setTitle(`${client.user.username}'s Commands`)
		.setFooter(`${client.user.username}'s Help`, `${client.user.avatarURL()}`)
		.setTimestamp()
		.setColor('BLUE')
		.setDescription(`This server's prefix is \`${prefix}\`.\nFor more info on a specific command, type \`${prefix}help <command>\`.`);

	let categories;
	if(message.author.id !== ownerid) {
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

function getCMD(client, message, input) {
	const embed = new MessageEmbed();

	const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

	const info = `No information found for command ${input.toLowerCase()}`;

	if (!cmd) {
		return message.channel.send(embed.setColor('BLUE').setDescription(info)).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
	}
	else{
		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		const hembed = new MessageEmbed()
			.setTitle(`Information for ${capitalizeFirstLetter(cmd.name.toString().toLowerCase())} command`)
			.setColor('BLUE')
			.setTimestamp()
			.setFooter('Syntax: <> = required, [] = optional', `${client.user.avatarURL()}`)
			.setDescription([
				`**❯ Name:** ${cmd.name}`,
				`**❯ Category:** ${capitalizeFirstLetter(cmd.category.toString().toLowerCase())}`,
				`**❯ Description:** ${cmd.description}`,
				`**❯ Usage:** ${cmd.usage}`,
				`**❯ Aliases:** ${cmd.aliases ? cmd.aliases.map((a) => `\`${a}\``).join(', ') : '`None`'}`,
			]);
		message.channel.send(hembed);
	}
}