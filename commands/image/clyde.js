const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'clyde',
	category: 'Image',
	description: 'Make Clyde say something.',
	aliases: [],
	usage: 'clyde <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const image = await canvas.clyde(text);
		const attachment = new MessageAttachment(image, 'clyde.png');
		return message.channel.send(attachment);
	},
};