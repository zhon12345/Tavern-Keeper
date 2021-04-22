/* eslint-disable no-unused-vars */
const { randomNoRepeat } = require("../../functions");

module.exports = {
	name: "soccer",
	category: "Fun",
	description: "Play a game of soccer.",
	aliases: ["football"],
	usage: "soccer",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const filter = m => m.author.id === message.author.id;
		const intro = "Soccer - Hit the ball into a goal where the goalkeeper is not! To hit the ball, type `left`, `right` or `middle`.";
		const possible = [
			"🥅🥅🥅\n      🕴️\n\n      ⚽",
			"🥅🥅🥅\n🕴️\n\n      ⚽",
			"🥅🥅🥅\n            🕴️\n\n      ⚽",
		];
		const panswers = [
			["left", "right"],
			["middle", "right"],
			["left", "middle"],
		];

		const random = randomNoRepeat(possible);
		const index = possible.indexOf(random);
		const answers = panswers[index];
		message.channel.send(`${intro}\n${random}`).then(() => {
			message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time", "max"] })
				.then(collected => {
					const ans = collected.first();
					if(!answers.includes(ans.content.toLowerCase())) {
						return message.channel.send("❌ The goalie skillfully blocked your shot!");
					}
					else{
						return message.channel.send("🎉 Congratulations! You scored a goal.");
					}
				})
				.catch(() => {
					message.channel.send("<:vError:725270799124004934> Looks like you did not answer in time.");
				});
		});
	},
};