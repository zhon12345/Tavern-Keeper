const { MessageEmbed } = require('discord.js');
const { BOT_OWNER } = process.env;

module.exports = {
	name: 'ship',
	category: 'Fun',
	description: 'Get the compatibility rate of a two users.',
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
		const member1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member1) {
			return message.channel.send('<:vError:725270799124004934> Please provide valid users');
		}

		const member2 = message.mentions.members.last() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username === args.slice(1).join(' ') || x.user.username === args[1]);
		if (!member2) {
			return message.channel.send('<:vError:725270799124004934> Please provide valid users');
		}

		const firstName = member1.user.username;
		const secondName = member2.user.username;

		const shipName = firstName.substr(0, firstName.length * 0.5) + secondName.substr(secondName.length * 0.5);

		if (shipName === client.users.cache.get(BOT_OWNER).username) {
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
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp()
			.setDescription(`Ship Name: **${shipName}**\nCompatibility: **${rating}%**\n**[**${meter.join('')}**]**`);
		message.channel.send(embed);
	},
};