/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'hentai',
	category: 'NSFW',
	description: 'Sends hentai, what do you expect?',
	aliases: [],
	usage: 'hentai',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		const subreddits = [
			'hentai',
			'ecchi',
			'HENTAI_GIF',
			'MonsterGirl',
		];

		const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];


		const url = [
			`https://www.reddit.com/r/${sub}.json?sort=top`,
		];

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => {
					const random = post[Math.floor(Math.random() * post.length) + 1];
					const embed = new MessageEmbed()
						.setColor('BLUE')
						.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
						.setTitle(random.title)
						.setImage(random.url)
						.setFooter(`👍 ${random.ups} | 💬 ${random.num_comments}`);

					message.channel.send(embed);
				});
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
	},
};