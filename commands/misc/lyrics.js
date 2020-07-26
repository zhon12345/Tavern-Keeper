const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lyrics',
	category: 'Misc',
	description: 'Searches for lyrics of a specified song',
	aliases: [],
	usage: 'lyrics <song>',
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		const song = args.slice().join(' ');
		const url = `https://some-random-api.ml/lyrics?title=${song}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${response.title} by ${response.author}`)
			.setURL(response.links.genius)
			.setThumbnail(response.thumbnail.genius);

		if(response.lyrics.length > 4095) {
			embed.setDescription(
				`The lyrics are too long to be returned in a message embed. Click [here](${response.links.genius}) instead`,
			);
			message.channel.send(embed);
		}
		else if(response.lyrics.length < 2000) {
			embed.setDescription(response.lyrics);
			message.channel.send(embed);
		}
		else {
			embed.setDescription(response.lyrics.slice(0, 2000));
			const embed2 = new MessageEmbed()
				.setColor('BLUE')
				.setDescription(response.lyrics.slice(2000, response.lyrics.length));
			await message.channel.send(embed).then(() => {
				message.channel.send(embed2);
			});
		}
	},
};