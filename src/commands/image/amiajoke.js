const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'amiajoke',
	category: 'Image',
	description: 'Bruh, am I a joke to you?',
	aliases: ['amiajoketoyou'],
	usage: 'amiajoke <user>',
	userperms: [],
	botperms: ['ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const image = `https://api.alexflipnote.dev/amiajoke?image=${member.user.displayAvatarURL({ format: 'png' })}`;
		const attachment = new MessageAttachment(image, 'amiajoke.png');
		message.channel.send(attachment);
	},
};