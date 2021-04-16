const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { capitalizeFirstLetter } = require("../../functions");

module.exports = {
	name: "corona",
	description: "Shows the statistics for Covid-19 worldwide or a specified location.",
	usage: "corona <location>",
	category: "Info",
	aliases: ["covid", "cv"],
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const baseUrl = "https://disease.sh/v3/covid-19/";

		let url, response, corona;

		try {
			url = args[0] ? `${baseUrl}countries/${args[0]}` : `${baseUrl}all`;
			response = await fetch(url).then(res => res.json());
			corona = response;
		}
		catch (error) {
			return message.channel.send("<:vError:725270799124004934> An error occurred, please try again!");
		}

		try{
			const pp = (corona.cases / corona.tests * 100).toFixed(1);
			const np = 100 - (corona.cases / corona.tests * 100).toFixed(1);
			const embed = new MessageEmbed()
				.setTitle(args[0] ? `Coronavirus (COVID-19) Information - ${capitalizeFirstLetter(args[0])}` : "Coronavirus (COVID-19) Information - Worldwide")
				.setDescription("[Find out more info from the WHO here](https://www.who.int/emergencies/diseases/novel-coronavirus-2019)")
				.setColor("#fb644c")
				.setThumbnail(args[0] ? corona.countryInfo.flag : "https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif")
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: "Confirmed Cases", value: `\`\`\`${corona.cases.toLocaleString()}\`\`\``, inline: true },
					{ name: "Cases Today", value: `\`\`\`${corona.todayCases.toLocaleString()}\`\`\``, inline: true },
					{ name: "Total Deaths", value: `\`\`\`${corona.deaths.toLocaleString()}\`\`\``, inline: true },
					{ name: "Death Today", value: `\`\`\`${corona.todayDeaths.toLocaleString()}\`\`\``, inline: true },
					{ name: "Total Recovered", value: `\`\`\`${corona.recovered.toLocaleString()}\`\`\``, inline: true },
					{ name: "Critical Cases", value: `\`\`\`${corona.critical.toLocaleString()}\`\`\``, inline: true },
					{ name: "Active Cases", value: `\`\`\`${corona.active.toLocaleString()}\`\`\``, inline: true },
					{ name: "Total Tested", value: `\`\`\`${corona.tests.toLocaleString()}\`\`\``, inline: true },
					{ name: "Cases per million", value: `\`\`\`${corona.casesPerOneMillion.toLocaleString()}\`\`\``, inline: true },
					{ name: "Death per million", value: `\`\`\`${corona.deathsPerOneMillion.toLocaleString()}\`\`\``, inline: true },
					{ name: "Tested per million", value: `\`\`\`${corona.testsPerOneMillion.toLocaleString()}\`\`\``, inline: true },
					{ name: "Current Fatality Rate", value: `\`\`\`${(corona.deaths / corona.cases * 100).toFixed(1)}%\`\`\``, inline: true },
					{ name: "Current Recovery Rate", value: `\`\`\`${(corona.recovered / corona.cases * 100).toFixed(1)}%\`\`\``, inline: true },
					{ name: "Positive Test Percentage", value: `\`\`\`${pp.toLocaleLowerCase() === "infinity" ? "0.0" : pp}%\`\`\``, inline: true },
					{ name: "Negative Test Percentage", value: `\`\`\`${np === -Infinity ? "0.0" : np}%\`\`\``, inline: true },
				);

			await message.channel.send(embed);
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid country (eg. `Japan`).",
			);
		}
	},
};