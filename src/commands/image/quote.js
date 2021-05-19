const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'quote',
	category: 'Image',
	description: 'Get someone to say whatever you want!',
	aliases: [],
	usage: 'quote [user] <text>',
	disabled: false,
	userperms: [],
	botperms: ['ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const text = args.slice(1).join(' ');
		const image = await canvas.quote({ image: member.user.displayAvatarURL({ format: 'png' }), message: text, username: member.user.username });
		const attachment = new MessageAttachment(image, 'quote.png');
		return message.channel.send(attachment).then(message.delete());
	},
};