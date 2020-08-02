const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'binary',
	category: 'Misc',
	description: 'Converts normal text to 011000100110100101101110011000010111001001111001.',
	aliases: [],
	usage: 'binary <text>',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			);
		}

		const text = args.slice().join(' ');
		const url = `http://some-random-api.ml/binary?text=${text}`;

		let response, data;
		try {
			response = await fetch(url).then(res => res.json());
			data = response;
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Binary Encoder')
			.addField('Input', `\`\`\`\n${text}\`\`\``)
			.addField('Output', `\`\`\`\n${data.binary}\`\`\``);

		message.channel.send(embed);
	},
};