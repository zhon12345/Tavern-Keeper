const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'bed',
	category: 'Image',
	description: 'Make your own bed meme.',
	aliases: [],
	usage: 'bed <user>',
	userperms: [],
	botperms: ['ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const image = await canvas.bed(message.author.displayAvatarURL({ format: 'png' }), member.user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'bed.png');
		return message.channel.send(attachment);
	},
};