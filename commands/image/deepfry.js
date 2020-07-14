const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'deepfry',
	category: 'Image',
	description: 'Deepfries a avatar of yourself or a specifed user.',
	aliases: [],
	usage: 'deepfry [user]',
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

		const image = await canvas.deepfry(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'deepfry.png');
		return message.channel.send(attachment);
	},
};