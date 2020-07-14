const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'supreme',
	category: 'Image',
	description: 'Make a supreme logo with text of your choice.',
	aliases: [],
	usage: 'supreme <text>',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		const image = `https://api.alexflipnote.dev/supreme?text=${args.join('%20')}`;
		const attachment = new MessageAttachment(image, 'supreme.png');
		message.channel.send(attachment);
	},
};
