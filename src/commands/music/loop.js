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
			client.player.setRepeatMode(message.guild.id, true);

			const song = await client.player.nowPlaying(message.guild.id);

			message.channel.send(
				`<:vSuccess:725270799098970112> Now Repeating \`${song.name}\`.`,
			);
		}
		catch(e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

	},
};