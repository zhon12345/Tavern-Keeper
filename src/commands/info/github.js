const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
	name: 'github',
	description: 'Displays information about someone\'s Github account',
	usage: 'github <username>',
	category: 'Info',
	aliases: ['git', 'gh'],
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const name = args.join(' ');
		if (!name) {
			return message.channel.send(
				'`❌` Please provide a valid user  (eg. `zhon12345`).',
			);
		}

		const url = `https://api.github.com/users/${name}`;

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
				.setTitle(`${response.login}'s GitHub Profile`)
				.setDescription(response.bio ? response.bio : '`None`')
				.setURL(response.html_url)
				.setThumbnail(response.avatar_url)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addField('<:documents:773950876347793449> General ❯', [
					`> **<:card:773965449402646549> Name: \`${response.login}\`**`,
					`> **\\📇 ID: \`${response.id}\`**`,
					`> **\\👦 Avatar: [\`Click here!\`](${response.avatar_url})**`,
					`> **\\📍 Location: \`${response.location ? response.location : 'None'}\`**`,
					`> **\\📧 E-mail: \`${response.email ? response.email : 'None'}\`**`,
					`> **\\🌐 Website: \`${response.blog ? response.blog : 'None'}\`**`,
					`> **\\👥 Followers: \`${response.followers.toLocaleString()}\` Followers**`,
					`> **\\👤 Following: \`${response.following.toLocaleString()}\` Following**`,
					`> **\\🗃️ Repositories: \`${response.public_repos.toLocaleString()}\` Repositories**`,
					`> **\\📅 Created: \`${moment(response.created_at).format('MMMM Do YYYY, h:mm:ss')}\` | \`${Math.floor((Date.now() - Date.parse(response.created_at)) / 86400000)}\` day(s) ago**`,
				]);
			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(
				'`❌` Please provide a valid user  (eg. `zhon12345`).',
			);
		}
	},
};