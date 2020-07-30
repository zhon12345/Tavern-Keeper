const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'djs',
	category: 'Info',
	description: 'Searches the Discord.JS documentation for the specified query.',
	aliases: [],
	usage: 'djs <query>',
	run: async (client, message, args) => {
		const query = args.slice().join(' ');
		if(!query) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid query.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const url = 'https://djsdocs.sorta.moe/v1/main/stable/embed?q=' + query;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
		const pkg = response;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(pkg.author.name, pkg.author.icon_url)
			.setDescription(pkg.description);
		if(pkg.fields) {embed.addFields(pkg.fields);}
		if(pkg.title) {embed.setTitle(pkg.title);}

		message.channel.send(embed);
	},
};