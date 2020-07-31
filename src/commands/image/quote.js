const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'quote',
	category: 'Image',
	description: 'Get someone to say whatever you want!',
	aliases: [],
	usage: 'quote [user] <text>',
	run: async (client, message, args) => {
		let user;
		let text;

		if(message.mentions.users.first()) {
			user = message.mentions.users.first();
			text = args.slice(1).join(' ');
			if(!text) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide valid text.',
				).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
			}
		}
		else if(Number(args[0])) {
			user = message.guild.members.cache.get(args[0]).user;
			text = args.slice(1).join(' ');
			if(!text) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide valid text.',
				).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
			}
		}
		else {
			user = message.author;
			text = args.slice().join(' ');
			if(!text) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide valid text.',
				).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
			}
		}

		const image = await canvas.quote({ image: user.displayAvatarURL({ format: 'png' }), message: text, username: user.username });
		const attachment = new MessageAttachment(image, 'quote.png');
		return message.channel.send(attachment);
	},
};