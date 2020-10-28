/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "slots",
	category: "Fun",
	description: "​How lucky are you? Play slots to find out.",
	aliases: [],
	usage: "slots",
	run: async (client, message, args) => {
		const slot = ["🍒", "🍊", "🍋", "🍉", "🍌"];
		const rand1 = Math.floor(Math.random() * slot.length);
		const rand2 = Math.floor(Math.random() * slot.length);
		const rand3 = Math.floor(Math.random() * slot.length);
		const result = `${slot[rand1]} : ${slot[rand2]} : ${slot[rand3]}`;

		message.channel.send("🎰 Spinning...").then(msg => {
			const bembed = new MessageEmbed();
			if(rand1 == rand2 && rand2 == rand3) {
				bembed.setColor("GREEN");
				bembed.setDescription([`
            -------------------

            ${result}

            -------------------
            You Won!
            `]);
			}
			else {
				bembed.setColor("RED");
				bembed.setDescription([`
            -------------------
            
            ${result}

            -------------------
            You Lost!
            `]);
			}
			msg.edit(bembed);
		});

	},
};