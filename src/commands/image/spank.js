const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'spank',
	category: 'Image',
	description: 'Spank those naughty users.',
	aliases: [],
	usage: 'spank <user>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS', 'ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

		if(member.id === message.author.id) {
			return message.channel.send(
				'`❌` You are not allowed to spank yourself.',
			);
		}

		const image = await canvas.spank(message.author.displayAvatarURL({ format: 'png' }), member.user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'wanted.png');
		return message.channel.send(attachment);
	},
};