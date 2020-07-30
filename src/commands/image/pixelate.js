const fetch = require('node-fetch');
const token = process.env.AMETHYSTE_API_TOKEN;
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'pixelate',
	category: 'Image',
	description: 'Pixelate the avatar of yourself or a specified user.',
	aliases: [],
	usage: 'pixelate [user]',
	run: async (client, message, args) => {
		let user;
		if(message.mentions.users.first()) {
			user = message.mentions.users.first().displayAvatarURL({ format: 'png' });
		}
		else if(!isNaN(args[0])) {
			user = message.guild.members.cache.get(args[0]).user.displayAvatarURL({ format: 'png' });
		}
		else {
			user = message.author.displayAvatarURL({ format: 'png' });
		}

		const url = 'https://v1.api.amethyste.moe/generate/pixelize';
		const data = {
			'pixelize': 15,
			'url': user,
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
			console.log(e);
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}
		const attachment = new MessageAttachment(response, 'pixelize.png');
		return message.channel.send(attachment);
	},
};