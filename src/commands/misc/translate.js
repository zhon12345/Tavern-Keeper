const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'translate',
	category: 'Misc',
	description: 'Why does this mean? Time to translate it.',
	usage: 'translate',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		const url = `https://bruhapi.xyz/translate/${encodeURI(text)}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			console.log(e);
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Translator')
			.addField('Language', `\`\`\`\n${response.lang}\`\`\``)
			.addField('Input', `\`\`\`\n${response.original}\`\`\``)
			.addField('Output', `\`\`\`\n${response.text}\`\`\``)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();

		message.channel.send(embed);
	},
};