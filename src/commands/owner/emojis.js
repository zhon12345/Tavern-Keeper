const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'emojis',
	description: 'View all emojis in the specified guild.',
	category: 'Owner',
	usage: 'emojis',
	aliases: ['elist'],
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		let emojis = '';
		let emojisAnimated = '';
		let emojiCount = 0;
		let animated = 0;
		let overallEmojis = 0;
		function Emoji(id) {
			return client.emojis.cache.get(id).toString();
		}
		guild.emojis.cache.forEach((emoji) => {
			overallEmojis++;
			if (emoji.animated) {
				animated++;
				emojisAnimated += Emoji(emoji.id);
			}
			else {
				emojiCount++;
				emojis += Emoji(emoji.id);
			}
		});

		if(!emojis) {
			emojis = '`None`';
		}

		if(!emojisAnimated) {
			emojisAnimated = '`None`';
		}

		const Embed = new MessageEmbed()
			.setDescription(`**Total: [${overallEmojis}]**`)
			.addField(`Regular [${emojiCount}]`, emojis.length > 1024 ? `${emojis.slice(0, 1021)}...` : emojis)
			.addField(`Animated [${animated}]`, emojisAnimated.length > 1024 ? `${emojisAnimated.slice(0, 1021)}...` : emojisAnimated)
			.setColor('BLUE');
		message.channel.send(Embed);
	},
};