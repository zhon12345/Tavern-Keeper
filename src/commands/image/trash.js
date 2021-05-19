const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'trash',
	category: 'Image',
	description: 'lol ur trash.',
	aliases: [],
	usage: 'trash [user]',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS', 'ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const image = await canvas.trash(member.user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'trash.png');
		return message.channel.send(attachment);
	},
};