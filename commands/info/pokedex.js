const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter, undeci } = require('../../functions');

module.exports = {
	name: 'pokedex',
	category: 'Info',
	description: 'Searches the Pokédex for a Pokémon.',
	aliases: ['pokemon', 'pokémon', 'pokédex'],
	usage: 'pokemon <pokemon>',
	run: async (client, message, args) => {
		const pokemon = args.slice().join(' ');
		if(!pokemon) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid Pokémon.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const data = response;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`${capitalizeFirstLetter(data.name)} #${data.id}`)
			.setThumbnail(data.sprites.front_default)
			.addFields(
				{ name: 'Height', value: `${undeci(data.height)} m`, inline: true },
				{ name: 'Weight', value: `${undeci(data.weight)} kg`, inline: true },
				{ name: 'Type', value: data.types.map(e => capitalizeFirstLetter(e.type.name)).join(', ') },
			);
		data.stats.forEach(stat => embed.addField(capitalizeFirstLetter(stat.stat.name).split('Special-attack').join('Sp. Attack').split('Special-defense').join('Sp. Defense'), stat.base_stat, true));
		message.channel.send(embed);
	},
};