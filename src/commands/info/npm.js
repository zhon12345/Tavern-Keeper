const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'npm',
	category: 'Info',
	description: 'Get info about a specified npm package.',
	aliases: [],
	usage: 'npm <package>',
	guildOnly: true,
	run: async (client, message, args) => {
		const package = args[0];
		if(!package) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid package.',
			);
		}

		let response;
		try {
			response = await fetch('https://api.npms.io/v2/search?q=' + args[0]).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}

		try{
			const pkg = response.results[0].package;
			const embed = new MessageEmbed()
				.setTitle('NPM Package')
				.setThumbnail('https://images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png')
				.setURL(pkg.links.npm)
				.addFields(
					{ name: 'Name', value: pkg.name },
					{ name: 'Description', value: pkg.description },
					{ name: 'Author', value: pkg.author ? pkg.author.name : 'None' },
					{ name: 'Version', value: pkg.version },
					{ name: 'Repository', value: pkg.links.repository ? pkg.links.repository : 'None' },
					{ name: 'Maintainers', value: pkg.maintainers ? pkg.maintainers.map(e => e.username).join(', ') : 'None' },
					{ name: 'Keywords', value: pkg.keywords ? pkg.keywords.join(', ') : 'None' },
				)
				.setColor('BLUE')
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp();

			message.channel.send(embed);
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid package.',
			);
		}
	},
};