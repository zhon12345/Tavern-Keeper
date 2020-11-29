/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "meme",
	category: "Image",
	description: "Get some fresh new memes from reddit!",
	aliases: ["memes"],
	usage: "meme",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const subreddits = [
			"memes",
			"dankmemes",
			"meme",
		];

		const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
		const url = `https://www.reddit.com/r/${sub}/hot.json`;

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => {
					const random = post[Math.floor(Math.random() * post.length) + 1];
					const embed = new MessageEmbed()
						.setColor("BLUE")
						.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
						.setTitle(random.title)
						.setImage(random.url)
						.setFooter(`👍 ${random.ups} | 💬 ${random.num_comments}`);

					message.channel.send(embed);
				});
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}
	},
};