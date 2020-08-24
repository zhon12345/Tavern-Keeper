/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'otter',
	category: 'Animals',
	description: 'Otters are SO cute',
	aliases: ['otters'],
	usage: 'otter',
	guildOnly: true,
	run: async (client, message, args) => {
		const url = [
			'https://www.reddit.com/r/Otter/hot.json',
		];

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => Randomimage(post));

		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		function Randomimage(post) {
			const random = post[Math.floor(Math.random() * post.length) + 1];
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
				.setTitle(random.title)
				.setImage(random.url)
				.setFooter(`👍 ${random.ups} | 💬 ${random.num_comments}`);

			message.channel.send(embed);
		}
	},
};