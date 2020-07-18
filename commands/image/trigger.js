const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'trigger',
	category: 'Image',
	description: 'Make yourself or a specified user triggered.',
	aliases: [],
	usage: 'trigger [user]',
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

		const image = await canvas.trigger(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'triggered.gif');
		return message.channel.send(attachment);
	},
};