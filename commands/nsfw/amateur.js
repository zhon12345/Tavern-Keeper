/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'amateur',
	category: 'NSFW',
	description: 'Sends images of ameteur girls, what do you expect?',
	aliases: [],
	usage: 'amatuer',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		const subreddits = [
			'RealGirls',
			'amateur',
			'gonewild',
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
				.setTitle(random.title)
				.setImage(random.url)
				.setFooter(`👍 ${random.ups} | 💬 ${random.num_comments}`);

			message.channel.send(embed);
		}
	},
};