const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'steam',
	aliases: [],
	category: 'Info',
	description: 'Searches a Game on Steam for your query.',
	usage: 'steam <query>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS', 'EMBED_LINKS'],
	run: async (client, message, args) => {
		const query = args.slice().join(' ');
		if (!query) {
			return message.channel.send(
				'`❌` Please provide a valid query (eg. `Terraria`).',
			);
		}

		const url1 = `https://store.steampowered.com/api/storesearch?cc=us&l=en&term=${encodeURIComponent(query)}`;

		const id = await fetch(url1).then(res => res.json());
		if (!id.items[0]) {
			return message.channel.send('`❌` Could not find any results.');
		}

		const url2 = `https://store.steampowered.com/api/appdetails?appids=${id.items[0].id}`;
		const response = await fetch(url2).then(res => res.json());
		const data = response[id.items[0].id.toString()].data;

		const platforms = [];
		if (data.platforms) {
			if (data.platforms.windows) platforms.push('Windows');
			if (data.platforms.mac) platforms.push('Mac');
			if (data.platforms.linux) platforms.push('Linux');
		}
		try {
			const embed = new MessageEmbed()
				.setColor('BLUE')
				.setTitle(`${data.name} on Steam`)
				.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
				.setThumbnail(data.header_image)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addField('<:documents:773950876347793449> General ❯', [
					`> **\\💰 Price: \`${data.price_overview ? data.price_overview.final_formatted : 'Free'}\`**`,
					`> **\\📈 Metascore: \`${data.metacritic ? data.metacritic.score : 'Unknown'}\`**`,
					`> **\\👍 Recommendations: \`${data.recommendations ? data.recommendations.total.toLocaleString() : 'Unknown'}\`**`,
					`> **\\🖥 Platforms: \`${platforms.length ? platforms.join(', ') : 'None'}\`**`,
					`> **\\📆 Release Date: \`${data.release_date ? data.release_date.date : 'Unknown'}\`**`,
					`> **<:download:777428428873400343> DLC Count: \`${data.dlc ? data.dlc.length.toLocaleString() : 0}\`**`,
					`> **\\👨‍💻 Developers: \`${data.developers ? data.developers.join(', ') : 'Unknown'}\`**`,
					`> **\\📢 Publishers: \`${data.publishers ? data.publishers.join(', ') : 'Unknown'}\`**`,
				]);
			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(
				'`❌` Please provide a valid query (eg. `Terraria`)',
			);
		}
	},

};