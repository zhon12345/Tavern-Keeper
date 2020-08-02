const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const API_KEY = process.env.GIPHY_API_TOKEN;

module.exports = {
	name: 'gif',
	category: 'Misc',
	description: 'Searches for a specified gif.',
	aliases: [],
	usage: 'gif <text>',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			);
		}

		const text = args.slice().join(' ');
		const url = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(text)}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(response.data[0].title)
			.setURL(response.data[0].url)
			.setImage(response.data[0].embed_url);

		message.channel.send(embed);
	},
};