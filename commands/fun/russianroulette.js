/* eslint-disable no-unused-vars */
const { delay } = require("../../functions");

module.exports = {
	name: "russianroulette",
	category: "Fun",
	description: "Gamble with your life and play russian roulette.",
	aliases: ["rr"],
	usage: "russianroulette",
	run: async (client, message, args) => {
		const rr_bullet = Math.floor(Math.random() * 6);
		const rr_count = 1 ;
		message.channel.send("You spin the cylinder of the revolver with 1 bullet in it...").then(async msg => {
			await delay(1000);
			await msg.edit("...you place the muzzle against your head and pull the trigger...");
			await delay(3000);
			if (rr_bullet == rr_count) {
				msg.edit("...your brain gets splattered all over the wall.");
			}
			else {
				msg.edit("...you live to see another day.");
			}
		});
	},
};