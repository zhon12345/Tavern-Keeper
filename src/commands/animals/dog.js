/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const h2p = require('html2plaintext');
const fetch = require('node-fetch');

module.exports = {
	name: 'dog',
	category: 'Animals',
	description: 'See some cute doggos!',
	aliases: ['dogs', 'doggo', 'puppy', 'puppies'],
	usage: 'dog',
	run: async (client, message, args) => {
		const subreddits = [
			'corgi',
			'blop',
			'dogswithjobs',
			'PuppySmiles',
		];

		const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

		const url = [
			`https://www.reddit.com/r/${sub}/hot.json`,
		];

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => {
					const random = post[Math.floor(Math.random() * post.length) + 1];
					if(random.is_video === true || !random.url.endsWith('jpg')) {
						return message.channel.send(
							'<:vError:725270799124004934> An error occured, please try again!',
						);
					}
					const embed = new MessageEmbed()
						.setColor('BLUE')
						.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
						.setTitle(h2p(random.title))
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