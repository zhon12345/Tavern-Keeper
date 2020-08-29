const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'country',
	category: 'Info',
	description: 'Displays information about a specified country.',
	aliases: [],
	usage: 'country <country>',
	run: async (client, message, args) => {
		const country = args.slice().join(' ');
		if(!country) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid Pokémon.',
			);
		}
		const url = 'https://restcountries.eu/rest/v2/name/' + country;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		try{
			const data = response[0];
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle(data.name)
				.setThumbnail(`https://www.countryflags.io/${data.alpha2Code}/flat/64.png`)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: 'Population', value: data.population.toLocaleString(), inline: true },
					{ name: 'Capital', value: data.capital ? data.capital : 'None', inline: true },
					{ name: 'Currency', value: data.currencies[0].symbol, inline: true },
					{ name: 'Location', value: data.subregion ? data.subregion : data.region, inline: true },
					{ name: 'Demonym', value: data.demonym ? data.demonym : 'None', inline: true },
					{ name: 'Native Name', value: data.nativeName, inline: true },
					{ name: 'Area', value: `${data.area.toLocaleString()}km`, inline: true },
					{ name: 'Languages', value: data.languages.map(lang => lang.name).join('/') },
				);
			message.channel.send(embed);
		}
		catch{
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid country.',
			);
		}
	},
};