/* eslint-disable no-unused-vars */
module.exports = {
	name: 'stop',
	category: 'Music',
	description: 'Disconnect the bot from the voice channel it is in.',
	aliases: ['disconnect', 'fuckoff'],
	usage: 'stop',
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
			return message.guild.me.voice.channel.leave();
		}

		try{
			await client.player.stop(message.guild.id);

			const song = await client.player.nowPlaying(message.guild.id);
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully stopped \`${song.name}\`.`,
			);
		}
		catch{
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid country.',
			);
		}
	},
};