const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "weather",
	description: "Shows the weather of a specified location.",
	usage: "weather <location>",
	category: "Info",
	aliases: ["temp"],
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid location (eg. `Melbourne`)",
			);
		}

		weather.find({
			search: args.join(" "),
			degreeType: "C",
		}, function(err, result) {
			if (err) {
				message.channel.send(err);
			}

			if (!result[0]) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide a valid location (eg. `Melbourne`)",
				);
			}

			const embed = new MessageEmbed()
				.setTitle(`Weather for ${result[0].current.observationpoint}`)
				.setDescription(`Current Conditions: **${result[0].current.skytext}**`)
				.setThumbnail(result[0].current.imageUrl)
				.setColor("BLUE")
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: "Timezone", value: `UTC ${result[0].location.timezone}`, inline: true },
					{ name: "Degree Measurement", value: `°${result[0].location.degreetype}`, inline: true },
					{ name: "Temperature", value: `${result[0].current.temperature} Degrees`, inline: true },
					{ name: "Feels Like", value: `${result[0].current.feelslike} Degrees`, inline: true },
					{ name: "Wind", value: result[0].current.winddisplay, inline: true },
					{ name: "Humidity", value: `${result[0].current.humidity}%`, inline: true },
				);
			message.channel.send(embed);
		});
	},
};