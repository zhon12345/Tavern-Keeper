/* eslint-disable no-unused-vars */
const { BOT_OWNER, GITHUB_USERNAME, GITHUB_CLIENT_TOKEN } = process.env;
const { embedURL } = require("../../functions");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "changelog",
	category: "Owner",
	description: "Shows the 10 latest commits.",
	aliases: [],
	usage: "changelog",
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return;
		}

		const url = `https://api.github.com/repos/${GITHUB_USERNAME}/Tavern-Keeper/commits`;

		let response;
		try {
			response = await fetch(url, { headers:{ authorization: `token ${GITHUB_CLIENT_TOKEN}` } })
				.then(res => res.json());
		}
		catch (e) {
			return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
		}

		const commits = response.slice(0, 12);
		const embed = new MessageEmbed()
			.setTitle("[Tavern-Keeper:master] 12 latest commits")
			.setColor("BLUE")
			.setURL(`https://github.com/${GITHUB_USERNAME}/Tavern-Keeper/commits/master`)
			.setDescription(commits.map(commit => {
				const hash = embedURL(`\`${commit.sha.slice(0, 7)}\``, commit.html_url, false);
				return `${hash} ${commit.commit.message.split("\n")[0].length > 50 ? `${commit.commit.message.split("\n")[0].substr(0, 50 - 3)}...` : commit.commit.message.split("\n")[0]} - ${commit.author.login}`;
			}).join("\n"));
		return message.channel.send(embed);
	},
};