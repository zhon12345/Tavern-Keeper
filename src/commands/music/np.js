/* eslint-disable no-unused-vars */
module.exports = {
	name: 'np',
	category: 'Music',
	description: 'Shows what song the bot is currently playing.',
	aliases: ['nowplaying'],
	usage: 'np',
	guildOnly: true,
	run: async (client, message, args) => {
		if(!client.player.isPlaying(message.guild.id)) {
			return message.channel.send('<:vError:725270799124004934> There is nothing playing.');
		}

		const song = await client.player.nowPlaying(message.guild.id);
		message.channel.send(`Now Playing:\n\`${song.name}\` requested by \`${song.requestedBy}\`\n${client.player.createProgressBar(message.guild.id)}`);
	},
};