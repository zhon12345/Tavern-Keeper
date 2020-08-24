/* eslint-disable no-unused-vars */
module.exports = {
	name: 'join',
	category: 'Music',
	description: 'Shows what song the bot is currently playing.',
	aliases: ['nowplaying'],
	usage: 'np',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!message.member.voice.channel) {
			return message.channel.send(
				'<:vError:725270799124004934> You must be connected to a voice channel to use this command.',
			);
		}

		if (message.guild.me.voice.channel) {
			return message.channel.send(
				'<:vError:725270799124004934> I am already in a voice channel.',
			);
		}

		message.member.voice.channel.join();
	},

};