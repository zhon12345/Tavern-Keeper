const { alternateCaps } = require("../../functions");

module.exports = {
	name: "spongebob",
	category: "Fun",
	description: "Converts text into SpOnGeBoB mOcKiNg TeXt.",
	aliases: ["mock"],
	usage: "spongebob <text>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send(":vError:725270799124004934> Text not found, please provide valid text.");
		} else {
			message.channel.send(`${alternateCaps(text)}`);
		}
	},
};
