/* eslint-disable no-unused-vars */
module.exports = {
	name: "slots",
	category: "Fun",
	description: "​How lucky are you? Play slots to find out.",
	aliases: [],
	usage: "slots",
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const slot = ["🍒", "🍊", "🍋", "🍉", "🍌"];
		const a = slot[Math.floor(Math.random() * slot.length)];
		const b = slot[Math.floor(Math.random() * slot.length)];
		const c = slot[Math.floor(Math.random() * slot.length)];

		const result = `----------------\n${a} : ${b} : ${c}\n----------------`;

		message.channel.send("🎰 Spinning...").then(msg => {
			if (a === b && b === c) {
				msg.edit(`${result}\n\nAll matching, you won! 🎉`);
			}
			else if (a === b || a === c || b === c) {
				msg.edit(`${result}\n\n2 matching, you won! 🎉`);
			}
			else {
				msg.edit(`${result}\n\nNo match, you lost! 😢`);
			}
		});

	},
};