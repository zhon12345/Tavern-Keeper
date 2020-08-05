const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions');

module.exports = {
	name: 'aliases',
	category: 'Info',
	description: 'Shows you a list of aliases for the specified command.',
	aliases: [],
	usage: 'aliases <command>',
	guildOnly: true,
	run: async (client, message, args) => {
		if(args[0]) {
			return aliases(client, message, args[0]);
		}
		else{
			return message.channel.send(
				'<:vError:725270799124004934> Please provied a vaild command.',
			);
		}

	},

};

function aliases(client, message, input) {
	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
	if(!cmd) {
		return message.channel.send(
			'<:vError:725270799124004934> Please provied a vaild command.',
		);
	}
	else {
		let alias;
		if(cmd.aliases.length === 0) {
			alias = '`None`';
		}
		else {
			alias = cmd.aliases.map((a) => `\`${a}\``).join(', ');
		}
		const embed = new MessageEmbed()
			.setTitle(`Aliases for ${capitalizeFirstLetter(cmd.name.toString().toLowerCase())}`)
			.setDescription(alias)
			.setColor('BLUE');
		return message.channel.send(embed);
	}
}