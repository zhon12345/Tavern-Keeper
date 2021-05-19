/* eslint-disable no-unused-vars */
module.exports = {
	name: 'guess',
	category: 'Fun',
	description: 'guessing game of the year 10/10',
	aliases: ['gtn'],
	usage: 'guess',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const random = Math.floor(Math.random() * 10) + 1;
		const filter = mi => mi.author.id === message.author.id;
		let attempts = 3;
		let hints = Math.floor(attempts / 2);

		const ti = await message.reply(`You've got ${attempts} attempts to try and guess my random number between **1 and 10**. Type your answer in the chat.\nYou can type \`end\` at anytime to stop, or type \`hint\` to get a hint.`);


		const guess = async (lastnumber) => {
			let msg = '';
			const collector = ti.channel.createMessageCollector(filter, { time: 30000 });
			collector.on('collect', (propmt) => {
				if (propmt.content.toLowerCase() === 'end') {
					collector.stop();
					return message.channel.send('You ended the game');
				}
				if (propmt.content.toLowerCase() === 'hint') {
					collector.stop();
					if (!lastnumber) {
						message.channel.send('You\'ve gotta actually take a guess first before you get a hint idiot');
					}
					else if (hints < 1) {
						message.channel.send('You don\'t have any hints left lol');
					}
					else {
						message.channel.send(`Your last number (**${lastnumber}**) was too ${random - lastnumber > 0 ? 'low' : 'high'}\nYou've got \`${attempts}\` attempts${attempts === 1 ? '' : 's'} left and \`${hints -= 1}\` hint${hints === 1 ? '' : 's'} left.`);
					}
					return guess(lastnumber);
				}
				const picked = Number(propmt.content);

				if (picked === random) {
					collector.stop();
					return message.channel.send(`Good stuff, you got the number right. I was thinking of **${random}**`);
				}
				if (attempts <= 1) {
					collector.stop();
					return message.channel.send(`Unlucky, you ran out of attempts to guess the number. I was thinking of **${random}**`);
				}

				if (!picked || !Number.isInteger(picked)) {
					collector.stop();
					msg = 'SMH it\'s gotta be a **valid** number between `1` and `10`\n';
				}
				else if (picked > 10 || picked < 1) {
					collector.stop();
					msg = 'Listen buddy, it\'s gotts be a number between `1` and `10`. No higher, no lower\n';
				}
				else {
					collector.stop();
					msg = 'not this time, ';
				}
				message.channel.send(`${msg}\`${attempts -= 1}\` attempts${attempts === 1 ? '' : 's'} left and \`${hints}\` hint${hints === 1 ? '' : 's'} left.`);

				guess(picked);
			});

			collector.on('end', async (_, reason) => {
				if (['time'].includes(reason)) {
					message.channel.send('alright looks like we\'re not playing the game, whatever');
				}
			});
		};

		await guess();
	},
};