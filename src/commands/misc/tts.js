const googleTTS = require('google-tts-api');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'tts',
	category: 'Misc',
	description: 'The power of text-to-speech!',
	aliases: [],
	usage: 'tts',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if(!text) {
			return message.channel.send(
				'`❌` Please provide valid text',
			);
		}

		const url = googleTTS.getAudioUrl(text, {
			lang: 'en-US',
			slow: false,
			host: 'https://translate.google.com',
		});

		const embed = new MessageAttachment(url, 'tts.mp3');

		message.channel.send(embed);
	},
};