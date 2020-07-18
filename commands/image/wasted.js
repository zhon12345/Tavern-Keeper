const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'wasted',
	category: 'Image',
	description: 'Display the wasted text on a specified user\'s avatar.',
	aliases: [],
	usage: 'wasted [user]',
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

		const image = await canvas.wasted(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'wasted.png');
		return message.channel.send(attachment);
	},
};