const { capitalizeFirstLetter } = require("../../functions");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
	name: "anime",
	description: "Displays information about a specific anime",
	usage: "anime <anime>",
	category: "Info",
	aliases: [],
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const anime = args.join(" ");
		if (!anime) {
			return message.channel.send("`❌` Please provide a valid anime (eg. `Attack on Titan`).");
		}

		const url = new URL("https://kitsu.io/api/edge/anime");
		url.searchParams.append("filter[text]", anime);

		let response;
		try {
			res = await fetch(url.toString());

			if (!res.ok) {
				throw new Error(`Kitsu API returned status ${res.status}`);
			}

			response = await res.json();
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		if (response.data.length === 0) {
			return message.channel.send(`\`❌\` No results found for query: ${anime}.`);
		}

		const data = response.data[0];
		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setTitle(data.attributes.titles.en ? data.attributes.titles.en : data.attributes.titles.en_jp)
			.setDescription(data.attributes.synopsis)
			.setURL(`https://kitsu.io/anime/${data.attributes.slug}`)
			.setThumbnail(data.attributes.posterImage.original)
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp()
			.addFields(
				{ name: "Status", value: capitalizeFirstLetter(data.attributes.status), inline: true },
				{
					name: "Aired Duration",
					value: `\`${moment(data.attributes.startDate).format("MMM D, YYYY")}\` to \`${data.attributes.endDate ? moment(data.attributes.endDate).format("MMM D, YYYY") : "???"}\``,
					inline: true,
				},
				{ name: "Show Type", value: capitalizeFirstLetter(data.attributes.subtype), inline: true },
				{ name: "Age Rating", value: data.attributes.ageRating, inline: true },
				{
					name: "Episodes",
					value: data.attributes.episodeCount ? data.attributes.episodeCount : "Unknown",
					inline: true,
				},
				{
					name: "Duration",
					value: data.attributes.episodeLength ? `${data.attributes.episodeLength} mins/ep` : "Unknown",
					inline: true,
				},
			);

		if (data.attributes.coverImage) {
			embed.setImage(data.attributes.coverImage.original);
		}

		message.channel.send(embed);
	},
};
