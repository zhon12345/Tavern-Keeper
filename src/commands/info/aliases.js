const { capitalizeFirstLetter } = require('../../functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'aliases',
	category: 'Info',
	description: 'Shows you a list of aliases for the specified command.',
	aliases: [],
	usage: 'aliases <command>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
		if(!cmd) {
			return message.channel.send(
				'`❌` Please provied a vaild command.',
			);
		}

		const embed = new MessageEmbed()
			.setTitle(`Aliases for ${capitalizeFirstLetter(cmd.name.toString().toLowerCase())}`)
			.setDescription(cmd.aliases.length ? cmd.aliases.map((a) => `\`${a}\``).join(', ') : '`None`')
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		return message.channel.send(embed);
	},
};
