const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'supreme',
	category: 'Image',
	description: 'Make a supreme logo with the text of your choice.',
	usage: 'supreme <text>',
	run: async (client, message, args) => {
		if(!message.guild.me.hasPermission('ATTACH_FILES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ATTACH_FILES` required.',
			);
		}

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
