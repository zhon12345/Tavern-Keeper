const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'spank',
	category: 'Image',
	description: 'Spank those naughty users.',
	aliases: [],
	usage: 'spank <user>',
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

		if(user === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to spank yourself.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const image = await canvas.spank(message.author.displayAvatarURL({ format: 'png' }), user.displayAvatarURL({ format: 'png' }));
		const attachment = new MessageAttachment(image, 'wanted.png');
		return message.channel.send(attachment);
	},
};