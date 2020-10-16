const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'bed',
	category: 'Image',
	description: 'Make your own bed meme.',
	usage: 'bed <user>',
	run: async (client, message, args) => {
		if(!message.guild.me.hasPermission('ATTACH_FILES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ATTACH_FILES` required.',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const image = await canvas.bed(message.author.displayAvatarURL({ format: 'png' }), member.user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'bed.png');
		return message.channel.send(attachment);
	},
};