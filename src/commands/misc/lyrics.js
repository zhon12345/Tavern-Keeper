const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lyrics',
	category: 'Music',
	description: 'Searches for lyrics of a specified song.',
	aliases: [],
	usage: 'lyrics <song>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			);
		}

		const song = args.slice().join(' ');
		const url = `https://some-random-api.ml/lyrics?title=${song}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occurred, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${response.title} by ${response.author}`)
			.setURL(response.links.genius)
			.setThumbnail(response.thumbnail.genius)
			.setDescription(response.lyrics.length > 2048 ? `${response.lyrics.slice(0, 2045)}...` : response.lyrics)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();
		return message.channel.send(embed);
	},
};