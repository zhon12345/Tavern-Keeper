const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'trash',
	category: 'Image',
	description: 'lol ur trash.',
	aliases: [],
	usage: 'trash [user]',
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

		const image = await canvas.trash(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'trash.png');
		return message.channel.send(attachment);
	},
};