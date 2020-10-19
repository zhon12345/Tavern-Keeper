module.exports = {
	name: 'remove',
	category: 'Music',
	description: 'Remove a track from the queue.',
	aliases: [],
	usage: 'remove <number>',
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
			const number = args[0];
			if(isNaN(number)) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid number.',
				);
			}

			if(number > queue.tracks.length) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid number.',
				);
			}

			client.player.remove(message.guild.id, number);
			return message.channel.send(
				`<:vSuccess:725270799098970112> Successfully removed \`${number}\``,
			);
		}
		catch(e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

	},
};