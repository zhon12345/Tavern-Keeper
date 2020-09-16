const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'instagram',
	aliases: ['insta'],
	category: 'Info',
	description: 'Find a user\'s instagram statistics.',
	usage: 'instagram <user>',
	run: async (client, message, args) => {
		const name = args.join(' ');
		if (!name) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user',
			);
		}

		const url = `https://instagram.com/${name}/?__a=1`;

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
			const account = response.graphql.user;
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle(account.full_name)
				.setURL(`https://instagram.com/${name}`)
				.setThumbnail(account.profile_pic_url_hd)
				.setDescription(account.biography.length == 0 ? 'None' : account.biography)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addFields(
					{ name: 'Posts', value: `\`\`\`${account.edge_owner_to_timeline_media.count.toLocaleString()}\`\`\``, inline: true },
					{ name: 'Followers', value: `\`\`\`${account.edge_followed_by.count.toLocaleString()}\`\`\``, inline: true },
					{ name: 'Following', value: `\`\`\`${account.edge_follow.count.toLocaleString()}\`\`\``, inline: true },
					{ name: 'Private', value: `\`\`\`${account.is_private ? 'Yes' : 'No'}\`\`\``, inline: true },
					{ name: 'Verified', value: `\`\`\`${account.is_verified ? 'Yes' : 'No'}\`\`\``, inline: true },
					{ name: 'Recently Joined', value: `\`\`\`${account.is_joined_recently ? 'Yes' : 'No'}\`\`\``, inline: true },
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