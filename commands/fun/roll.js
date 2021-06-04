/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const rollDice = () => Math.floor(Math.random() * 6) + 1;

module.exports = {
	name: "roll",
	category: "Fun",
	description: "Roll a dice and get a random number from 1 - 6.",
	aliases: ["rolldice", " diceroll"],
	usage: "roll",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		message.channel.send("🎲 Rolling...").then((msg) => {
			const Embed = new MessageEmbed()
				.setTitle("You rolled a . .")
				.setColor("BLUE")
				.setDescription(
					`${rollDice()}!`,
				);
			msg.edit(Embed);
		});
	},
};