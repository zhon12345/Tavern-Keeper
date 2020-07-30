const fetch = require('node-fetch');
const token = process.env.AMETHYSTE_API_TOKEN;
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'batslap',
	category: 'Image',
	description: 'Batslap a specified user.',
	aliases: ['slap'],
	usage: 'batslap <user>',
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

		const url = 'https://v1.api.amethyste.moe/generate/batslap';
		const data = {
			'avatar': message.author.displayAvatarURL({ format: 'png' }),
			'url': user.displayAvatarURL({ format: 'png' }),
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
		const attachment = new MessageAttachment(response, 'batslap.png');
		return message.channel.send(attachment);
	},
};