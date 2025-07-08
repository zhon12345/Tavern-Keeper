module.exports = {
	name: "portal",
	category: "Fun",
	description: "Do you even play minecraft?",
	aliases: ["nether"],
	usage: "portal  ",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message) => {
		message.channel.send(
			"<:obsidian:769399257165463592><:obsidian:769399257165463592><:obsidian:769399257165463592><:obsidian:769399257165463592>\n<:obsidian:769399257165463592><a:portal:769399213724532746><a:portal:769399213724532746><:obsidian:769399257165463592>\n<:obsidian:769399257165463592><a:portal:769399213724532746><a:portal:769399213724532746><:obsidian:769399257165463592>\n<:obsidian:769399257165463592><a:portal:769399213724532746><a:portal:769399213724532746><:obsidian:769399257165463592>\n<:obsidian:769399257165463592><:obsidian:769399257165463592><:obsidian:769399257165463592><:obsidian:769399257165463592>",
		);
	},
};
