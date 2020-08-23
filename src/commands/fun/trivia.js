/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter, strip } = require('../../functions');

module.exports = {
	name: 'trivia',
	category: 'Fun',
	description: 'Test your knowledge with a trivia question.',
	aliases: ['quiz'],
	usage: 'trivia',
	run: async (client, message, args) => {
		const filter = (m) => m.author.id === message.author.id;
		const url = 'https://opentdb.com/api.php?amount=1&type=boolean';
		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addFields(
				{ name: strip(response.results[0].question), value: ['*You have 15 seconds to find the correct answer.\n\n True or False?*'] },
				{ name: 'Difficulty', value: `\`${capitalizeFirstLetter(response.results[0].difficulty)}\``, inline:true },
				{ name: 'Category', value: `\`${response.results[0].category}\``, inline: true },
			);

		message.channel.send(embed).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time', 'max'] })
				.then(collected => {
					const ans = collected.first();
					if(ans.content.toLowerCase() === response.results[0].correct_answer.toLowerCase()) {
						return message.channel.send('🎉 Congratulations! Your answer is correct');
					}
					else {
						return message.channel.send(`❌ Your answer is incorrect! The correct answer is \`${response.results[0].correct_answer}\``);
					}
				})
				.catch(collected => {
					message.channel.send('<:vError:725270799124004934> Looks like you did not answer in time.');
				});
		});
	},
};