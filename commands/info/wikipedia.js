const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "wikipedia",
	category: "Info",
	description: "Returns information from Wikipedia.",
	aliases: ["wiki"],
	usage: "wikipedia <query>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const query = args.slice().join(" ");
		if (!query) {
			return message.channel.send("`❌` Query not found, please provide a valid query (eg. `Adidas`).");
		}

		const nsfw = ["porn", "vagina", "breats", "hentai", "bdsm", "naked", "rape", "nude", "sex"];
		for (const word of nsfw) {
			if (query.includes(word) && !message.channel.nsfw) {
				return message.channel.send("`❌` This query can only be viewed in a nsfw channel.");
			}
		}

		const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

		let body;
		try {
			body = await fetch(url).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		try {
			if (body.type === "disambiguation") {
				const embed = new MessageEmbed()
					.setColor("BLUE")
					.setTitle(body.title)
					.setURL(body.content_urls.desktop.page)
					.setDescription([
						`
					${body.extract}

					Disambiguation [page](${body.content_urls.desktop.page}) providing links to topics that could be referred to by the same search term
					`,
					]);

				message.channel.send(embed);
			} else {
				const embed = new MessageEmbed()
					.setColor("BLUE")
					.setTitle(body.title)
					.setThumbnail(body.thumbnail.source)
					.setURL(body.content_urls.desktop.page)
					.setDescription(body.extract);

				message.channel.send(embed);
			}
		} catch {
			return message.channel.send("`❌` Query not found, please provide a valid query (eg. `Adidas`).");
		}
	},
};
