const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'changemymind',
	category: 'Image',
	description: 'Generate a personalised changemymind meme',
	aliases: [],
	usage: 'changemymind <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const url = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}
		const attachment = new MessageAttachment(response.message, 'changemymind.png');
		return message.channel.send(attachment);
	},
};