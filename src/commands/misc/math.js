const math = require('mathjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'math',
	category: 'Misc',
	description: 'Helps you solve a math calculation.',
	aliases: ['calculate'],
	usage: 'math <equation>',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid calculation',
			);
		}
		let resp;
		try {
			resp = math.evaluate(args.join(' '));
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid calculation',
			);
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Math Calculation')
			.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
			.addField('Output', `\`\`\`js\n${resp}\`\`\``);

		message.channel.send(embed);
	},
};