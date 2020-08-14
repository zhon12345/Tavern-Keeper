/* eslint-disable no-unused-vars */
module.exports = {
	name: 'pause',
	category: 'Music',
	description: 'Pauses the currently playing track.',
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

		if(!client.player.isPlaying(message.guild.id)) {
			return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
		}

		await client.player.pause(message.guild.id);

		return message.react('⏸');
	},
};