/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'embed',
	category: 'Misc',
	description: 'Get a example embed or embed specified text.',
	usage: 'embed [text]',
	run: async (client, message, args) => {
		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('title ~~(did you know you can have markdown here too?)~~')
			.setURL('https://discord.js.org/')
			.setAuthor('author name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
			.setDescription('this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```')
			.setThumbnail('https://i.imgur.com/wSTFkRM.png')
			.addFields(
				{ name: '🤔', value: 'some of these properties have certain limits...' },
				{ name: '😱', value: 'try exceeding some of them!' },
				{ name: '🙄', value: 'an informative error should show up, and this view will remain as-is until all issues are fixed' },
				{ name: '<:thonking:733624898819457087>', value: 'these last two', inline: true },
				{ name: '<:thonking:733624898819457087>', value: 'are inline fields', inline: true },
			)
			.setImage('https://i.imgur.com/wSTFkRM.png')
			.setTimestamp('2020-07-17T09:56:39.960Z')
			.setFooter('footer text', 'https://i.imgur.com/wSTFkRM.png');

		return message.channel.send('this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```', exampleEmbed);
	},
};