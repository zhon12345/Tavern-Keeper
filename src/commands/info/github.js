const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'github',
	description: 'Displays information about someone\'s Github account',
	usage: 'github <username>',
	category: 'Info',
	aliases: ['git', 'gh'],
	run: async (client, message, args) => {
		const name = args.join(' ');
		if (!name) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user',
			);
		}

		const url = `https://api.github.com/users/${name}`;

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
				.setTitle(`${response.login} (${response.id})`)
				.setDescription(response.bio ? response.bio : 'None')
				.addFields(
					{ name: 'Email', value: response.email ? response.email : 'None', inline: true },
					{ name: 'Company', value: response.company ? response.company : 'None', inline: true },
					{ name: 'Location', value: response.location ? response.location : 'None', inline: true },
					{ name: 'Followers', value: response.followers.toLocaleString(), inline: true },
					{ name: 'Following', value: response.following.toLocaleString(), inline: true },
					{ name: 'Repositories', value: response.public_repos.toLocaleString(), inline: true },
				)
				.setURL(response.html_url)
				.setThumbnail(response.avatar_url)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user',
			);
		}
	},
};