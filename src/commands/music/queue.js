/* eslint-disable no-unused-vars */
module.exports = {
	name: 'queue',
	category: 'Music',
	description: 'View the music queue',
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

		const queue = client.player.getQueue(message.guild.id);
		if(!queue) {
			return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
		}

		message.channel.send(`**Server queue**\n__Current__\n\`${queue.playing.name}\` | \`${queue.playing.requestedBy}\`\n\n__Up Next__\n` +
        (queue.tracks.length >= 1 ? queue.tacks.map((track, i) => { return `${i + 1}) \`${track.name}\` | \`${track.requestedBy}\``; }) : 'None'));
	},
};