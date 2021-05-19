const fetch = require('node-fetch');
const { isURL } = require('../../functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'shorten',
	category: 'Misc',
	description: 'Shortens a provided link using bit.ly.',
	aliases: ['short'],
	usage: 'shorten <url>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const link = args.slice().join(' ');
		if (!link) {
			return message.channel.send(
				'`❌` Please provide a valid link (eg. `https://google.com`).',
			);
		}
		else if(!isURL(link)) {
			return message.channel.send(
				'`❌` Please provide a valid link (eg. `https://google.com`).',
			);
		}

		const url = `https://is.gd/create.php?format=simple&url=${encodeURI(link)}`;

		let response;
		try {
			response = await fetch(url)
				.then(res => res.text());
		}
		catch (e) {
			return message.channel.send('`❌` An error occurred, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Link Shortener')
			.addField('Input', `\`\`\`\n${link}\`\`\``)
			.addField('Output', `\`\`\`\n${response}\`\`\``)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};