/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const token = process.env.NEWSAPI_API_TOKEN;

module.exports = {
	name: 'news',
	category: 'Misc',
	description: 'Get the latest news from around the world.',
	aliases: [],
	usage: 'news',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const num = Math.floor(Math.random() * 11);
		const url = 'https://newsapi.org/v2/top-headlines?sources=reuters&apiKey=' + token;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('`❌` An error occurred, please try again!');
		}

		const data = response.articles[num];
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(data.author)
			.setTitle(data.title)
			.setURL(data.url)
			.setThumbnail(data.urlToImage)
			.setDescription(data.description)
			.setTimestamp(data.publishedAt);

		message.channel.send(embed);
	},
};