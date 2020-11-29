const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const { capitalizeFirstLetter } = require("../../functions");

module.exports = {
	name: "pokedex",
	category: "Info",
	description: "Searches the Pokédex for a Pokémon.",
	aliases: ["pokemon", "pokémon", "pokédex", "pkm"],
	usage: "pokemon <pokemon>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const pokemon = args.slice().join(" ").toLowerCase();
		if(!pokemon) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid Pokémon.",
			);
		}
		const url = "https://some-random-api.ml/pokedex?pokemon=" + pokemon;
		const url2 = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

		let response, resp;
		try {
			response = await fetch(url).then(res => res.json());
			resp = await fetch(url2).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}
		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(`${capitalizeFirstLetter(response.name)} #${response.id}`)
			.setDescription(response.description)
			.setThumbnail(resp.sprites.front_default)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp()
			.addField("<:documents:773950876347793449> General ❯", [
				`> **Height: \`${response.height}\`**`,
				`> **Weight: \`${response.weight}\`**`,
				`> **Generation: \`${response.generation}\`**`,
				`> **Type: \`${response.type.join("`, `")}\`**`,
				"\u200b",
			])
			.addField("<:documents:773950876347793449> Stats ❯", [
				`> **Health: \`${resp.stats[0].base_stat}\` HP**`,
				`> **Attack: \`${resp.stats[1].base_stat}\` Attack**`,
				`> **Defense: \`${resp.stats[2].base_stat}\` Defense**`,
				`> **Sp. Attack: \`${resp.stats[3].base_stat}\` Sp. Attack**`,
				`> **Sp. Defense: \`${resp.stats[4].base_stat}\` Sp. Defense**`,
				`> **Speed: \`${resp.stats[5].base_stat}\` Speed**`,
				"\u200b",
			])
			.addField("<:documents:773950876347793449> Evolution ❯", [
				`> **\`${response.family.evolutionLine ? response.family.evolutionLine.join("` -> `") : "None"}\`**`,
			]);
		message.channel.send(embed);
	},
};