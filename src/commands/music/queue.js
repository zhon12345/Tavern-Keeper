/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'queue',
	category: 'Music',
	description: 'View the music queue',
	aliases: [],
	usage: 'pause',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.voice.channel) {
			return message.channel.send(
				'<:vError:725270799124004934> You must be connected to a voice channel to use this command.',
			);
		}

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not connected to the same voice channel.',
			);
		}

		try{
			const queue = client.player.getQueue(message.guild.id);
			if(!queue) {
				return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
			}

			const embed = new MessageEmbed()
				.setTitle('Server queue')
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.addFields(
					{ name: '__Now Playing__', value: `\`${queue.playing.name}\` | \`${queue.playing.requestedBy}\`` },
					{ name: '__Up Next__', value: `${queue.tracks.length >= 1 ? queue.tracks.map((track, i) => { return `${i + 1}) \`${track.name}\` | \`${track.requestedBy}\``; }).join('\n') : 'None'}` },
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