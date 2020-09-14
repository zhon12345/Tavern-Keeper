module.exports = {
	name: 'play',
	category: 'Music',
	description: 'Plays a song with the specified name.',
	aliases: [],
	usage: 'play <song>',
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

		const query = args.join(' ');
		if (!query) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid query.',
			);
		}

		const searchTracks = await client.player.searchTracks(query).catch(() => {
			return message.channel.send(
				'<:vError:725270799124004934> No results found.',
			);
		});

		if(searchTracks.length < 1) {
			return message.channel.send(
				'<:vError:725270799124004934> No results found.',
			);
		}

		const track = searchTracks[0];

		if(client.player.isPlaying(message.guild.id)) {
			const song = await client.player.addToQueue(message.guild.id, track, message.member.user.tag);
			return message.channel.send(`<:vSuccess:725270799098970112> Successfully added \`${song.name}\` to the queue.`);
		}
		else {
			const song = await client.player.play(message.member.voice.channel, track, message.member.user.tag);
			message.channel.send(`Now playing \`${song.name}\``);

			client.player.getQueue(message.guild.id).on('end', () => {
				message.channel.send('Queue completed, add some more songs to play!');
			});

			client.player.getQueue(message.guild.id).on('trackChanged', (oldSong, newSong, skipped, repeatMode) => {
				if(repeatMode) {
					message.channel.send(`Reapeating \`${oldSong.name}\``);
				}
				else {
					message.channel.send(`Now playing \`${newSong.name}\``);
				}
			});
		}
	},
};