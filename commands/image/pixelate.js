const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'pixelate',
	category: 'Image',
	description: 'Pixelate the avatar of yourself or a specified user.',
	aliases: [],
	usage: 'pixelate [user]',
	run: async (client, message, args) => {
		let user;
		if(message.mentions.users.first()) {
			user = message.mentions.users.first();
		}
		else if(args[0]) {
			user = message.guild.members.cache.get(args[0]).user;
		}
		else {
			user = message.author;
		}

		const image = await canvas.pixelate(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'pixelate.png');
		return message.channel.send(attachment);
	},
};