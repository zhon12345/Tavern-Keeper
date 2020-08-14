/* eslint-disable no-unused-vars */
module.exports = {
	name: 'volume',
	category: 'Music',
	description: 'Change the current volume.',
	aliases: [],
	usage: 'volume <number>',
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

		const volume = parseInt(args.join(' '));
		if (!volume) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid number.',
			);
		}
		else if(isNaN(args[0])) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid number.',
			);
		}
		else if (volume > 250) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a number that is less then 250.',
			);
		}

		client.player.setVolume(message.guild.id, volume);

		return message.channel.send(
			`<:vSuccess:725270799098970112> Successfully set volume to \`${volume}\`.`,
		);
	},
};