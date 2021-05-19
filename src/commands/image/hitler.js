const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'hitler',
	category: 'Image',
	description: 'It\'s not offensive if it\'s true, so use this wisely.',
	aliases: [],
	usage: 'hitler [user]',
	disabled: false,
	userperms: [],
	botperms: ['ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const image = await canvas.hitler(member.user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'hitler.png');
		return message.channel.send(attachment);
	},
};