const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'emojis',
	description: 'View all emojis in the guild.',
	category: 'Info',
	usage: 'emojis',
	aliases: ['elist'],
	run: async (client, message, args) => {
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
		const Embed = new MessageEmbed()
			.setTitle(`Emojis in ${guild.name}.`)
			.setDescription(
				`**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Total: [${OverallEmojis}]**`,
			)
			.setColor('BLUE');
		message.channel.send(Embed);
	},
};