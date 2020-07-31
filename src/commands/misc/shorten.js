const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { is_url } = require('../../functions');
const API_KEY = process.env.BITLY_API_TOKEN;

module.exports = {
	name: 'shorten',
	category: 'Misc',
	description: 'Shortens a provided link using bit.ly.',
	aliases: ['short'],
	usage: 'shortel <url>',
	run: async (client, message, args) => {
		const link = args.slice().join(' ');
		if (!link) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid link.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		else if(!is_url(link)) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid link.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const url = 'https://api-ssl.bitly.com/v4/shorten';

		const data = {
			'long_url': link,
		};

		let response;
		try {
			response = await fetch(url, { method: 'POST', headers: {
				'Content-Type': 'application/json',
				'authorization': `Bearer ${API_KEY}`,
			}, body: JSON.stringify(data) }).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Link Shortener')
			.addField('Input', `\`\`\`\n${link}\`\`\``)
			.addField('Output', `\`\`\`\n${response.link}\`\`\``);

		message.channel.send(embed);
	},
};