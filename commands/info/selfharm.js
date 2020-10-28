/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "selfharm",
	category: "Info",
	description: "A command to get help with self-harm or suicidal thoughts, it's NOT a joke to us.",
	aliases: ["suicide"],
	usage: "selfharm",
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.setAuthor("Suicide and Self-Harm Prevention")
			.setTitle("We want you to know you are never alone.")
			.setThumbnail("https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif")
			.setDescription([`
            **__Suicide/Self-Harm Immediate 24/7 Hotlines__**:
            [USA Suicide Hotline](https://suicidepreventionlifeline.org/)
            Phone Number : 1-800-273-8255

            [International Suicide Hotlines](https://www.opencounseling.com/suicide-hotlines)
            These hotlines are made available to those that do not reside in the United States currently. Look up the number on the list that correlates to your residency and call it. It will connect you to your country's suicide hotline.
            `])
			.setColor("BLUE");
		message.channel.send(embed);
	},
};