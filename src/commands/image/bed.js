const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'bed',
	category: 'Image',
	description: 'Make your own bed meme.',
	aliases: [],
	usage: 'bed <user>',
	run: async (client, message, args) => {
		let user;
		if(message.mentions.users.first()) {
			user = message.mentions.users.first();
		}
		else if(args[0]) {
			user = message.guild.members.cache.get(args[0]).user;
		}

		if (!user) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const image = await canvas.bed(message.author.displayAvatarURL({ format: 'png' }), user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'bed.png');
		return message.channel.send(attachment);
	},
};