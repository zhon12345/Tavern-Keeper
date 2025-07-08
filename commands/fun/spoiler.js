module.exports = {
	name: "spoiler",
	category: "Fun",
	description: "Make the bot say whatever you want in annoying spoiler form.",
	aliases: [],
	usage: "spoiler <text>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send("`❌` Text not found, please provide valid text. (eg. `Hello`)");
		}

		message.channel.send(`||${args.join(" ").split("").join("||||")}||`);
	},
};
