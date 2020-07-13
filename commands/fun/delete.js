const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'delete',
	category: 'Fun',
	description: 'Delete yourself or a specifid user.',
	aliases: [],
	usage: 'delete [user]',
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

		const image = await canvas.delete(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'delete.png');
		return message.channel.send(attachment);
	},
};