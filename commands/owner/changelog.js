const { GITHUB_USERNAME, GITHUB_CLIENT_TOKEN } = process.env;
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "changelog",
	category: "Owner",
	description: "Shows the 10 latest commits.",
	aliases: [],
	usage: "changelog <repository>",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message, args) => {
		if (!args[0] || args.length > 1) {
			return message.channel.send(
				"`❌` GitHub repository not found, please provide a valid GitHub repository. (eg. `Tavern-Keeper`)",
			);
		}

		const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${args[0]}/commits`;

		let response;
		try {
			response = await fetch(url, { headers: { authorization: `token ${GITHUB_CLIENT_TOKEN}` } }).then((res) =>
				res.json(),
			);
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		const commits = response.slice(0, 12);
		const embed = new MessageEmbed()
			.setTitle(
				`[${response[0].url.split(`https://api.github.com/repos/${GITHUB_USERNAME}/`).join("").split(`/commits/${response[0].sha}`).join("")}:master] 12 latest commits`,
			)
			.setColor("BLUE")
			.setURL(response[0].html_url.split(`commit/${response[0].sha}`).join("commits/master"))
			.setDescription(
				commits
					.map((commit) => {
						return `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url}) ${commit.commit.message.split("\n")[0].length > 50 ? `${commit.commit.message.split("\n")[0].substr(0, 50 - 3)}...` : commit.commit.message.split("\n")[0]} - ${commit.author.login}`;
					})
					.join("\n"),
			);
		return message.channel.send(embed);
	},
};
