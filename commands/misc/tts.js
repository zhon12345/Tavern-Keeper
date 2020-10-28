const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'tts',
	category: 'Misc',
	description: 'The power of text-to-speech!',
	aliases: [],
	usage: 'tts',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		const url = `https://bruhapi.xyz/tts/${encodeURI(text)}`;

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
		const embed = new MessageAttachment(response.url, 'tts.mp3');

		message.channel.send(embed);
	},
};