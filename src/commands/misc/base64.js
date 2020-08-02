const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'base64',
	category: 'Misc',
	description: 'Converts normal text to QmFzZTY0.',
	aliases: [],
	usage: 'base64 <text>',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			);
		}

		const text = args.slice().join(' ');
		const url = `http://some-random-api.ml/base64?encode=${text}`;

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
			.setTitle('Base64 Encoder')
			.addField('Input', `\`\`\`\n${text}\`\`\``)
			.addField('Output', `\`\`\`\n${data.base64}\`\`\``);

		message.channel.send(embed);
	},
};