/* eslint-disable no-unused-vars */
module.exports = {
	name: 'loop',
	category: 'Music',
	description: 'Pauses the currently playing track.',
	aliases: [],
	usage: 'loop',
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

		if(!client.player.isPlaying(message.guild.id)) {
			return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
		}

		try{
			const repeatMode = client.player.getQueue(message.guild.id).repeatMode;

			if(repeatMode) {
				const song = await client.player.nowPlaying(message.guild.id);
				client.player.setRepeatMode(message.guild.id, false);

				return message.channel.send(
					`<:vSuccess:725270799098970112> Successfully disabled loop for \`${song.name}\`.`,
				);
			}
			else {
				const song = await client.player.nowPlaying(message.guild.id);
				client.player.setRepeatMode(message.guild.id, true);

				return message.channel.send(
					`<:vSuccess:725270799098970112> Successfully enabled loop for \`${song.name}\`.`,
				);
			}
		}
		catch(e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}
	},
};