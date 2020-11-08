const { MessageEmbed } = require('discord.js');
const { BOT_OWNER } = process.env;

module.exports = {
	name: 'emojis',
	description: 'View all emojis in the specified guild.',
	category: 'Owner',
	usage: 'emojis',
	aliases: ['elist'],
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return;
		}

		const guild = client.guilds.cache.get(args[0]) || message.guild;
		let Emojis = '';
		let EmojisAnimated = '';
		let EmojiCount = 0;
		let Animated = 0;
		let OverallEmojis = 0;
		function Emoji(id) {
			return client.emojis.cache.get(id).toString();
		}
		guild.emojis.cache.forEach((emoji) => {
			OverallEmojis++;
			if (emoji.animated) {
				Animated++;
				EmojisAnimated += Emoji(emoji.id);
			}
			else {
				EmojiCount++;
				Emojis += Emoji(emoji.id);
			}
		});

		if(!Emojis) {
			Emojis = '`None`';
		}

		if(!EmojisAnimated) {
			EmojisAnimated = '`None`';
		}

		const Embed = new MessageEmbed()
			.setDescription(`**Total: [${OverallEmojis}]**`)
			.addField(`Regular [${EmojiCount}]`, Emojis.length > 1024 ? `${Emojis.slice(0, 1021)}...` : Emojis)
			.addField(`Animated [${Animated}]`, EmojisAnimated.length > 1024 ? `${EmojisAnimated.slice(0, 1021)}...` : EmojisAnimated)
			.setColor('BLUE');
		message.channel.send(Embed);
	},
};