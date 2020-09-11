const { BOT_OWNER } = process.env;
const { delay } = require('../../functions');
const responses = require('../../assets/json/fight.json');

module.exports = {
	name: 'fight',
	category: 'Fun',
	usage: 'fight <user>',
	aliases: [],
	dexcription: 'Simulates a fight against another user.',
	run: async (client, message, args) => {
		const player1 = message.author;
		const player2 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!player2) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid user',
			);
		}
		let hp1 = 100;
		let hp2 = 100;
		let turn1 = Math.random() > 0.5;

		if (player2.id === client.user.id && player1.id !== BOT_OWNER) {
			return message.channel.send([
				`**${client.user.username}** COMPLETELY AND UTTERLY DESTROYED **${player1.username}**! *[-999999 HP] [0 HP remaining]*`,
				'*Hint: Don\'t try to fight me! Nothing personal, kid.*',
			]);
		}
		else if (player2.id === BOT_OWNER) {
			return message.channel.send([
				`**${player2.user.username}** COMPLETELY AND UTTERLY DESTROYED **${player1.username}**! *[-999999 HP] [0 HP remaining]*`,
				`*Hint: Don't try to fight ${player2.user.username}! Nothing personal, kid.*`,
			]);
		}
		else {
			message.channel.send('⚔ Fighting...').then(async msg => {
				while (hp1 > 0 && hp2 > 0) {
					const i = Math.floor(Math.random() * responses.length);
					const x = Math.floor(Math.random() * 70);
					if (turn1 === true) {
						hp2 -= x;
						await msg.edit(`**${player2.user.username}** ${responses[i]} **${player1.username}**! *[-${x} hp] [${hp2} HP remaining]*`);
						await delay(2000);
						turn1 = false;
					}
					else {
						hp1 -= x;
						await msg.edit(`**${player1.username}** ${responses[i]} **${player2.user.username}**! *[-${x} hp] [${hp1} HP remaining]*`);
						await delay(2000);
						turn1 = true;
					}
					if (hp1 <= 0) {
						message.channel.send(`**${player1.username}** lost! GG **${player2.user.username}**!`);
					}
					else if (hp2 <= 0) {
						message.channel.send(`**${player2.user.username}** lost! GG **${player1.username}**!`);
					}
				}
			});
		}
	},
};