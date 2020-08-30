/* eslint-disable no-unused-vars */
module.exports = {
	name: 'resume',
	category: 'Music',
	description: 'Resume paused music.',
	aliases: [],
	usage: 'resume',
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

		if(!client.player.isPlaying(message.guild.id)) {
			return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
		}

		try{
			await client.player.resume(message.guild.id);

			const song = await client.player.nowPlaying(message.guild.id);
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully resumed \`${song.name}\`.`,
			);
		}
		catch{
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid country.',
			);
		}
	},
};