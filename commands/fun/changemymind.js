const Canvacord = require('canvacord');
const canvas = new Canvacord();
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'changemymind',
	category: 'Fun',
	description: 'Generate a personalised changemymind meme',
	aliases: [],
	usage: 'changemymind <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const image = await canvas.changemymind(text);
		const attachment = new MessageAttachment(image, 'changemymind.png');
		return message.channel.send(attachment);
	},
};