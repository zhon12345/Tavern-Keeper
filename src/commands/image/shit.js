const fetch = require('node-fetch');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'shit',
	category: 'Image',
	description: 'You worthless piece of shit! (jk)',
	aliases: [],
	usage: 'shit [user]',
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

		const url = `https://api.no-api-key.com/api/v1/crap?stepped=${member.user.displayAvatarURL({ format: 'png' })}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}
		const attachment = new MessageAttachment(response.url, 'shit.png');
		return message.channel.send(attachment);
	},
};