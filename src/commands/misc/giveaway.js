/* eslint-disable no-inner-declarations */
const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const humanizeDuration = require('humanize-duration');

module.exports = {
	name: 'giveaway',
	aliases: ['start'],
	usage: 'giveaway <winner> <time> <winners> <prize>',
	description: 'Starts a giveaway',
	category:'Misc',
	run: async (client, message, args) => {
		try {

			if (!args[0].match('[dhms]')) return message.channel.send('<:vError:725270799124004934> Please provide a valid time format.');

			if (isNaN(args[0][0])) return message.channel.send('<:vError:725270799124004934> Please provide a valid time format.');

			const channel = message.mentions.channels.first();
			if (!channel) return message.channel.send('<:vError:725270799124004934> Please provide a valid channel.');

			const prize = args.slice(2).join(' ');
			if (!prize) return message.channel.send('<:vError:725270799124004934> Please provide a valid prize.');
			message.channel.send(`Giveaway created in ${channel}`);

			const Embed = new MessageEmbed()
				.setTitle(`${prize}`)
				.setDescription([`
                React with 🎉 to enter!
                Time Remaining: **${humanizeDuration(ms(args[0]), { round: true })}**
                Hosted by: ${message.author}`])
				.setFooter('Ends at:')
				.setTimestamp(Date.now() + ms(args[0]))
				.setColor('BLUE');

			channel.send('🎉 **GIVEAWAY**🎉', Embed).then(msg =>{
				msg.react('🎉');

				let i = ms(args[0]);
				function Timer() {
					i = i - 17000;
					Embed.setTitle(`${prize}`);
					Embed.setDescription([`
                		React with 🎉 to enter!
                		Time Remaining: **${humanizeDuration(i, { round: true })}**
                		Hosted by: ${message.author}`]);
					Embed.setFooter('Ends at:');
					Embed.setTimestamp(Date.now() + ms(args[0]));
					Embed.setColor('BLUE');

					msg.edit(Embed);
				}
				const timer = setInterval(Timer, 17000);
				setTimeout(() => {
					if (msg.reactions.cache.get('🎉').count <= 1) {
						Embed.setTitle(`${prize}`);
						Embed.setDescription([`
							Nobody won, there was not enough poeple for me to draw a winner.
							Hosted by: ${message.author}
							`]);
						Embed.setFooter('Ended at:');
						Embed.setTimestamp();
						Embed.setColor('RED');
						msg.edit('🎉 **GIVEAWAY ENDED**🎉', Embed);
						clearInterval(timer);
					}
					else {
						const winner = msg.reactions.cache.get('🎉').users.cache.filter((u) => !u.bot).random();
						channel.send(`Congratulations ${winner}, You have won ${prize}!\n<https://discordapp.com/channels/${message.guild.id}/${channel.id}/${msg.id}>`);
						Embed.setTitle(`${prize}`);
						Embed.setDescription([`
							Winner: ${winner}
							Hosted by: ${message.author}
							`]);
						Embed.setFooter('Ended at:');
						Embed.setTimestamp();
						Embed.setColor('GREEN');
						msg.edit('🎉 **GIVEAWAY ENDED**🎉', Embed);
						clearInterval(timer);
					}
				}, ms(args[0]));
			});

			// eslint-disable-next-line brace-style
		} catch (err) {
			message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
			console.log(err);
		}
	},
};