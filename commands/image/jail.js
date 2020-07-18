const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'jail',
	category: 'Image',
	description: 'Put ​yourself or a specified user in jail.',
	aliases: [],
	usage: 'jail [user]',
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

		const image = await canvas.jail(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'jail.png');
		return message.channel.send(attachment);
	},
};