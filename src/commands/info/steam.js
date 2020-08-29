const fetch = require('node-fetch');
const h2p = require('html2plaintext');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'steam',
	aliases: [],
	category: 'Info',
	description: 'Get steam statistics for a specifed user.',
	usage: 'steam <user>',
	run: async (client, message, args) => {
		const name = args.join(' ');
		if (!name) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user',
			);
		}

		const url = `https://api.alexflipnote.dev/steam/user/${name}`;

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
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle(response.profile.username)
				.setURL(response.profile.url)
				.setThumbnail(response.avatars.avatarfull)
				.setDescription(h2p(response.profile.summary))
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: 'Private', value: response.profile.privacy, inline: true },
					{ name: 'VAC banned', value: response.profile.vacbanned ? 'Yes' : 'No', inline: true },
					{ name: 'Status', value: response.profile.state, inline: true },
					{ name: 'Location', value: response.profile.location ? response.profile.location : 'Unknown' },
					{ name: 'Created', value: response.profile.timecreated ? response.profile.timecreated : 'Unknown' },
				);
			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user',
			);
		}
	},
};