const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'drake',
	category: 'Image',
	description: 'Make a drake meme!',
	aliases: [],
	usage: 'drake <text> | <text>',
	userperms: [],
	botperms: ['ATTACH_FILES'],
	run: async (client, message, args) => {
		let text1 = args.join(' ').split(' | ')[0];
		let text2 = args.join(' ').split(' | ')[1];

		if (!text1 || !text2) {
			text1 = 'not providing any text';
			text2 = 'actually providing text';
		}

		const image = `https://api.alexflipnote.dev/drake?top=${text1}&bottom=${text2}`;
		const attachment = new MessageAttachment(image, 'drake.png');
		message.channel.send(attachment);
	},
};