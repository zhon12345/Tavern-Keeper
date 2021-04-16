const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'base64',
	category: 'Misc',
	description: 'Converts normal text to QmFzZTY0.',
	aliases: [],
	usage: 'base64 <encode/decode> <text>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> What do you want to do? Encode or decode.',
			);
		}
		else if (args[0].toLowerCase() === 'encode') {
			const text = args.slice(1).join(' ');
			if (!text) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide valid text (eg. `hi`). ',
				);
			}
			else if(text.length >= 1024) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide text that has less than 1024 words.',
				);
			}

			const url = `http://some-random-api.ml/base64?encode=${text}`;

			let response;
			try {
				response = await fetch(url).then(res => res.json());
			}
			catch (e) {
				return message.channel.send('<:vError:725270799124004934> An error occurred, please try again!');
			}

			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle('Base64 Encoder')
				.addField('Input', `\`\`\`\n${text}\`\`\``)
				.addField('Output', `\`\`\`\n${response.base64}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
		else if (args[0].toLowerCase() === 'decode') {
			const text = args.slice(1).join(' ');
			if (!text) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide valid base64 string (eg. `aGk=`)',
				);
			}
			else if(text.length >= 1024) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide text that has less than 1024 words.',
				);
			}

			const url = `http://some-random-api.ml/base64?decode=${text}`;

			let response;
			try {
				response = await fetch(url).then(res => res.json());
			}
			catch (e) {
				return message.channel.send('<:vError:725270799124004934> An error occurred, please try again!');
			}

			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle('Base64 Decoder')
				.addField('Input', `\`\`\`\n${text}\`\`\``)
				.addField('Output', `\`\`\`\n${response.text}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
	},
};