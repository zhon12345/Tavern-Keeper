/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'np',
	category: 'Music',
	description: 'Shows what song the bot is currently playing.',
	aliases: ['nowplaying'],
	usage: 'np',
	run: async (client, message, args) => {
		if(!client.player.isPlaying(message.guild.id)) {
			return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
		}

		try{
			const song = await client.player.nowPlaying(message.guild.id);
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setThumbnail(song.thumbnail)
				.addFields(
					{ name: '__Now Playing__', value: `[${song.name}](${song.url}) | \`${song.duration}\` \n \`Requested by: ${song.requestedBy}\`` },
					{ name: '__Pogression__', value: `[${client.player.createProgressBar(message.guild.id)}]` },
				);
			message.channel.send(embed);
		}
		catch{
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid country.',
			);
		}
	},
};