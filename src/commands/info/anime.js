const { capitalizeFirstLetter, getSuggestions } = require('../../functions');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
	name: 'anime',
	description: 'Displays information about a specific anime',
	usage: 'anime <anime>',
	category: 'Info',
	aliases: [],
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const anime = args.join(' ');
		if (!anime) {
			return message.channel.send(
				'`❌` Please provide a valid anime (eg. `Attack on Titan`).',
			);
		}

		const url = `https://kitsu.io/api/edge/anime?filter[text]=${anime}?filter[nsfw]=false?page[limit]=1`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'`❌` An error occurred, please try again!',
			);
		}

		try{
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle(response.data[0].attributes.titles.en ? response.data[0].attributes.titles.en : response.data[0].attributes.titles.en_jp)
				.setDescription(response.data[0].attributes.synopsis)
				.setURL(`https://kitsu.io/anime/${response.data[0].attributes.slug}`)
				.setThumbnail(response.data[0].attributes.posterImage.original)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: 'Status', value: capitalizeFirstLetter(response.data[0].attributes.status), inline: true },
					{ name: 'Aired Duration', value: `\`${moment(response.data[0].attributes.startDate).format('MMMM D, YYYY')}\` to \`${response.data[0].attributes.endDate ? moment(response.data[0].attributes.endDate).format('MMMM D, YYYY') : '???'}\``, inline: true },
					{ name: 'Show Type', value: capitalizeFirstLetter(response.data[0].attributes.subtype), inline: true },
					{ name: 'Age Rating', value: response.data[0].attributes.ageRating, inline: true },
					{ name: 'Episodes', value: response.data[0].attributes.episodeCount ? response.data[0].attributes.episodeCount : 'Unknown', inline: true },
					{ name: 'Duration', value: response.data[0].attributes.episodeLength ? `${response.data[0].attributes.episodeLength} mins/ep` : 'Unknown', inline: true },
					{ name: 'More Results', value: getSuggestions(response.data) },
				);

			if(response.data[0].attributes.coverImage) {
				embed.setImage(response.data[0].attributes.coverImage.original);
			}

			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(
				'`❌` Please provide a valid user (eg. `Attack on Titan`).',
			);
		}
	},
};