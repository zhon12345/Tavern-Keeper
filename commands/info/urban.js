const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "urban",
	category: "Info",
	description: "Get a definition from the Urban Dictionary. (NSFW Channel required)",
	aliases: ["ud"],
	usage: "urban <query>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				"<:vError:725270799124004934> This command can only be used in a nsfw channel.",
			);
		}
		const query = args.slice().join(" ");
		if(!query) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid query",
			);
		}
		const url = "https://api.urbandictionary.com/v0/define?term=" + query;

		let definition;
		try {
			definition = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occurred, please try again!",
			);
		}

		try{
			const meaning = definition.list[0];
			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle(meaning.word)
				.setURL(meaning.permalink)
				.setDescription(meaning.definition)
				.setFooter(`👍 ${meaning.thumbs_up} | 👎 ${meaning.thumbs_down}`)
				.addFields(
					{ name: "Example", value: meaning.example.length > 1000 ? definition.list[1].example : meaning.example },
					{ name: "Author", value: meaning.author, inline: true },
				);

			message.channel.send(embed);
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid query.",
			);
		}
	},
};