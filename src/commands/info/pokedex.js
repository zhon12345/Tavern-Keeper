const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { capitalizeFirstLetter } = require('../../functions');

module.exports = {
	name: 'pokedex',
	category: 'Info',
	description: 'Searches the Pokédex for a Pokémon.',
	aliases: ['pokemon', 'pokémon', 'pokédex', 'pkm'],
	usage: 'pokemon <pokemon>',
	run: async (client, message, args) => {
		const pokemon = args.slice().join(' ');
		if(!pokemon) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid Pokémon.',
			);
		}
		const url = 'https://some-random-api.ml/pokedex?pokemon=' + pokemon;
		const url2 = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;

		let response, resp;
		try {
			response = await fetch(url).then(res => res.json());
			resp = await fetch(url2).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const data = response[0];
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle(`${capitalizeFirstLetter(data.name)} #${data.id}`)
			.setDescription(data.description)
			.setThumbnail(resp.sprites.front_default)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp()
			.addFields(
				{ name: 'Height', value: `\`\`\`${data.height}\`\`\``, inline: true },
				{ name: 'Weight', value: `\`\`\`${data.weight}\`\`\``, inline: true },
				{ name: 'Generation', value: `\`\`\`${data.generation}\`\`\``, inline: true },
				{ name: 'Type', value: `\`\`\`${data.type.join(', ')}\`\`\`` },
			);
		resp.stats.forEach(stat => embed.addField(capitalizeFirstLetter(stat.stat.name).split('Special-attack').join('Sp. Attack').split('Special-defense').join('Sp. Defense'), `\`\`\`${stat.base_stat}\`\`\``, true));
		embed.addField('Evolutions', `\`\`\`${data.family.evolutionLine ? data.family.evolutionLine.join(' -> ') : 'None'}\`\`\``);
		message.channel.send(embed);
	},
};