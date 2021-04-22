const fetch = require('node-fetch');

module.exports = {
	name: 'djs',
	category: 'Info',
	description: 'Searches the Discord.JS documentation for the specified query.',
	aliases: ['docs'],
	usage: 'djs <query>',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const query = args.slice().join(' ');
		if(!query) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid query  (eg. `message`).',
			);
		}
		const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;

		try {
			await fetch(url)
				.then(res => res.json())
				.then(embed => {
					if(embed && !embed.error) {
						message.channel.send({ embed });
					}
					else {
						return message.channel.send(
							'<:vError:725270799124004934> Please provide a valid query  (eg. `message`).',
						);
					}
				});
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occurred, please try again!',
			);
		}
	},
};