const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'emojis',
	description: 'View all emojis in the specified guild.',
	category: 'Owner',
	usage: 'emojis [guild]',
	aliases: ['elist'],
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		let emojis = '';
		let emojisAnimated = '';
		function emote(id) {
			return client.emojis.cache.get(id).toString();
		}
		guild.emojis.cache.forEach(emoji => {
			emoji.animated ? emojisAnimated += emote(emoji.id) : emojis += emote(emoji.id);
		});

		const Embed = new MessageEmbed()
			.setDescription(`**Total: [${guild.emojis.cache.size}]**`)
			.addField(`Regular [${guild.emojis.cache.filter(emoji => !emoji.animated).size}]`, emojis ? emojis.length > 1024 ? `${emojis.slice(0, 1021)}...` : emojis : '`None`')
			.addField(`Animated [${guild.emojis.cache.filter(emoji => emoji.animated).size}]`, emojisAnimated ? emojisAnimated.length > 1024 ? `${emojisAnimated.slice(0, 1021)}...` : emojisAnimated : '`None`')
			.setColor('BLUE');
		message.channel.send(Embed);
	},
};