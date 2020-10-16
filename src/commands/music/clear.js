/* eslint-disable no-unused-vars */
module.exports = {
	name: 'clear',
	category: 'Music',
	description: 'Clears the queue.',
	usage: 'clear',
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

		const queue = client.player.getQueue(message.guild.id);
		if(!queue) {
			return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
		}

		try{
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully cleared \`${queue.tracks.length}\` songs.`,
			).then(() => {
				client.player.clearQueue(message.guild.id);
			});

		}
		catch(e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

	},
};