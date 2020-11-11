const fetch = require('node-fetch');
const token = process.env.AMETHYSTE_API_TOKEN;
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'pixelate',
	category: 'Image',
	description: 'Make someone\'s avatar pixelated.',
	aliases: [],
	usage: 'pixelate [user]',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS', 'ATTACH_FILES'],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;
		const url = 'https://v1.api.amethyste.moe/generate/pixelize';
		const data = {
			'pixelize': 15,
			'url': member.user.displayAvatarURL({ format: 'png' }),
		};

		const searchParams = Object.keys(data).map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
		}).join('&');

		let response;
		try {
			response = await fetch(url, { method: 'POST', body: searchParams, headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'authorization': `Bearer ${token}`,
			} }).then(res => res.buffer());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}
		const attachment = new MessageAttachment(response, 'pixelize.png');
		return message.channel.send(attachment);
	},
};