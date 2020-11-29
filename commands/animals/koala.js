/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const h2p = require("html2plaintext");
const fetch = require("node-fetch");

module.exports = {
	name: "koala",
	category: "Animals",
	description: "Only available in Australia!",
	aliases: ["koalas"],
	usage: "koala",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const url = "https://www.reddit.com/r/koalas/hot.json";

		let response;
		try {
			response = await fetch(url)
				.then(res => res.json())
				.then(json => json.data.children.map(v => v.data))
				.then(post => {
					let random = post[Math.floor(Math.random() * post.length) + 1];
					while (!random || !random.url.match(/(jpg|png|gif)$/)) {
						random = post[Math.floor(Math.random() * post.length) + 1];
					}
					if(random.url.endsWith("gifv")) {
						random.url.replace("gifv", "gif");
					}
					const embed = new MessageEmbed()
						.setColor("BLUE")
						.setURL(`https://www.reddit.com/r/${random.subreddit}/comments/${random.id}`)
						.setTitle(h2p(random.title))
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