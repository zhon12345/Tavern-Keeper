const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'invert',
	category: 'Image',
	description: 'Invert the colors of a user\'s avatar',
	aliases: ['colorfilp'],
	usage: 'invert <user>',
	disabled: false,
	userperms: [],
	botperms: ['ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const image = `https://api.alexflipnote.dev/filter/invert?image=${member.user.displayAvatarURL({ format: 'png' })}`;
		const attachment = new MessageAttachment(image, 'invert.png');
		message.channel.send(attachment);
	},
};