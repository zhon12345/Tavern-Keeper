const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'hitler',
	category: 'Fun',
	description: 'It\'s not offensive if it\'s true, so use this wisely.',
	aliases: [],
	usage: 'hitler [user]',
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

		const image = await canvas.hitler(user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'hitler.png');
		return message.channel.send(attachment);
	},
};