/* eslint-disable no-unused-vars */
const { delay } = require("../../functions");

module.exports = {
	name: "russianroulette",
	category: "Fun",
	description: "Gamble with your life and play russian roulette.",
	aliases: ["rr"],
	usage: "russianroulette",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const rrbullet = Math.floor(Math.random() * 6);
		const rrcount = 1 ;
		message.channel.send("You spin the cylinder of the revolver with 1 bullet in it...").then(async msg => {
			await delay(1000);
			await msg.edit("...you place the muzzle against your head and pull the trigger...");
			await delay(3000);
			if (rrbullet === rrcount) {
				msg.edit("...your brain gets splattered all over the wall.");
			}
			else {
				msg.edit("...you live to see another day.");
			}
		});
	},
};