/* eslint-disable no-unused-vars */
module.exports = {
	name: 'bassboost',
	category: 'Music',
	description: 'Enables the Bass Boost filter.',
	aliases: [],
	usage: 'bassboost',
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

		if(args[0].toLowerCase() === 'on') {
			client.player.setFilters(message.guild.id, {
				bassboost: true,
			});
			return message.channel.send(
				'<:vSuccess:725270799098970112> Successfully enabled Bass Boost.',
			);
		}
		else if (args[0].toLowerCase() === 'off') {
			client.player.setFilters(message.guild.id, {
				bassboost: false,
			});
			return message.channel.send(
				'<:vSuccess:725270799098970112> Successfully disabled Bass Boost.',
			);
		}
	},
};