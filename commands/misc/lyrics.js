const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "lyrics",
	category: "Misc",
	description: "Searches for lyrics of a specified song.",
	aliases: [],
	usage: "lyrics <song>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid text",
			);
		}

		const song = args.slice().join(" ");
		const url = `https://no-api-key.com/api/v1/ksof/lyrics?song=${song}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
		}

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(`${response.data.data[0].name} by ${response.data.data[0].artist}`)
			.setURL(response.data.data[0].url)
			.setThumbnail(response.data.data[0].album_art)
			.setDescription(response.data.data[0].lyrics.length > 2048 ? `${response.data.data[0].lyrics.slice(0, 2045)}...` : response.data.data[0].lyrics)
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();
		return message.channel.send(embed);
	},
};