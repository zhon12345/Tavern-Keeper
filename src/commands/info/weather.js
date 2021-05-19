const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'weather',
	description: 'Shows the weather of a specified location.',
	usage: 'weather <location>',
	category: 'Info',
	aliases: ['temp'],
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'`❌` Please provide a valid location  (eg. `Melbourne`).',
			);
		}

		weather.find({
			search: args.join(' '),
			degreeType: 'C',
		}, function(err, result) {
			if (err) {
				message.channel.send(err);
			}

			if (!result[0]) {
				return message.channel.send(
					'`❌` Please provide a valid location  (eg. `Melbourne`).',
				);
			}

			const { current, location } = result[0];
			const embed = new MessageEmbed()
				.setTitle(`Weather for ${current.observationpoint}`)
				.setDescription(`Current Conditions: **${current.skytext}**`)
				.setThumbnail(current.imageUrl)
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: 'Timezone', value: `UTC ${location.timezone}`, inline: true },
					{ name: 'Degree Measurement', value: `°${location.degreetype}`, inline: true },
					{ name: 'Temperature', value: `${current.temperature} Degrees`, inline: true },
					{ name: 'Feels Like', value: `${current.feelslike} Degrees`, inline: true },
					{ name: 'Wind', value: current.winddisplay, inline: true },
					{ name: 'Humidity', value: `${current.humidity}%`, inline: true },
				);
			message.channel.send(embed);
		});
	},
};