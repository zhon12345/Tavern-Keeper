const fetch = require("node-fetch");

module.exports = {
	name: "djs",
	category: "Info",
	description: "Searches the Discord.JS documentation for the specified query.",
	aliases: ["docs"],
	usage: "djs <query>",
	disabled: true,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const query = args.slice().join(" ");
		if (!query) {
			return message.channel.send("`❌` Query not found, please provide a valid query (eg. `message`).");
		}
		const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;

		try {
			await fetch(url)
				.then((res) => res.json())
				.then((embed) => {
					if (embed && !embed.error) {
						message.channel.send({ embed });
					} else {
						return message.channel.send("`❌` Query not found, please provide a valid query (eg. `message`).");
					}
				});
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}
	},
};
