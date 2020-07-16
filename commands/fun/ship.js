const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ship',
	category: 'Fun',
	description: 'Get the compatibility rate of a two users.',
	aliases: [],
	usage: 'ship <user> <user>',
	run: async (client, message, args) => {
		let rating = Math.floor(Math.random() * 100) + 1;
		const meter = ['▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬', '▬'];
		const hearts = {
			0: '❤️',
			1: '🧡',
			2: '💛',
			3: '💚',
			4: '💙',
			5: '💜',
		};
		if (!args[0]) {
			return message.channel.send(client.userError(exports, 'Missing argument, the `name1` argument is required!'));
		}

		if (!args[1]) {
			return message.channel.send(client.userError(exports, 'Missing argument, the `name2` argument is required!'));
		}

		const firstName = args[0];
		const secondName = args[1];

		const shipName = firstName.substr(0, firstName.length * 0.5) + secondName.substr(secondName.length * 0.5);

		if (shipName.toLowerCase() === 'teily' || shipName.toLowerCase() === 'emrra') {
			rating = '100';
		}

		let pos = 0;
		let under = 9;
		while (pos < 10) {
			if (rating < under) {
				meter.splice(pos, 0, hearts[Math.floor(Math.random() * 5)]);
				break;
			}
			pos++;
			under += 10;
		}

		if (rating >= 99) {
			meter.splice(9, 0, hearts[Math.floor(Math.random() * 5)]);
		}

		const embed = new MessageEmbed()
			.setTitle(`Original Names: ${firstName}, ${secondName}`)
			.setColor('BLUE')
			.setDescription(`Ship Name: **${shipName}**\nCompatibility: **${rating}%**\n**[**${meter.join('')}**]**`);
		message.channel.send(embed);
	},
};