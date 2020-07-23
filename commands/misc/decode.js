const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'decode',
	category: 'Misc',
	description: 'Converts encoded Binary & Base 64 text back to normal.',
	aliases: [],
	usage: 'binary <text>',
	run: async (client, message, args) => {
		const embed = new MessageEmbed();
		const text = args.slice().join(' ');
		let url;
		if (!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else if(text.length >= 1024) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide text that is lesser that 1024 words.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else if(isNaN(text)) {
			url = `https://some-random-api.ml/base64?decode=${text}`;
			embed.setTitle('Base64 Decoder');

		}
		else {
			url = `http://some-random-api.ml/binary?decode=${text}`;
			embed.setTitle('Binary Decoder');
		}

		let response, data;
		try {
			response = await fetch(url).then(res => res.json());
			data = response.text;
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}


		embed.setColor('BLUE');
		embed.addField('Input', `\`\`\`\n${text}\`\`\``);
		embed.addField('Output', `\`\`\`\n${data}\`\`\``);

		message.channel.send(embed);
	},
};