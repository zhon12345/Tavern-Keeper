/* eslint-disable max-statements-per-line */
const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'weather',
	description: 'Shows the weather of a specified loction.',
	usage: 'weather <location>',
	category: 'Info',
	aliases: ['temp'],
	run: async (client, message, args) => {
		if (!args[0]) {return message.channel.send('Please provide a location.');}

		weather.find({
			search: args.join(' '),
			degreeType: 'C',
		}, function(err, result) {
			if (err) {message.channel.send(err);}

			if (result === undefined || result.length === 0) {return message.channel.send('Please enter a valid location.');}

			const { current, location } = result[0];
			message.channel.send(
				new MessageEmbed()
					.setAuthor(`Weather for ${current.observationpoint}`)
					.setDescription(`Current Conditions: **${current.skytext}**`)
					.setColor('BLUE')
					.addField('Timezone', `UTC ${location.timezone}`, true)
					.addField('Degree Measurement', `°${location.degreetype}`, true)
					.addField('Temperature', `${current.temperature} Degrees`, true)
					.addField('Feels Like', `${current.feelslike} Degrees`, true)
					.addField('Wind', current.winddisplay, true).addField('Humidity', `${current.humidity}%`, true)
					.setThumbnail(current.imageUrl));
		});
	},
};