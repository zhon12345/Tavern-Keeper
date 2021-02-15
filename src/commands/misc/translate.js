const translate = require('@vitalets/google-translate-api');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'translate',
	category: 'Misc',
	description: 'Why does this mean? Time to translate it.',
	aliases: [],
	usage: 'translate',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');

		translate(text, {
			to: 'en',
		}).then(res => {
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle(`${res.from.language.iso} Translator`)
				.addField('Input', `\`\`\`\n${text}\`\`\``)
				.addField('Output', `\`\`\`\n${res.text}\`\`\``)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}).catch(e => {
			return message.channel.send(
				'<:vError:725270799124004934> An error occurred, please try again!',
			);
		});
	},
};