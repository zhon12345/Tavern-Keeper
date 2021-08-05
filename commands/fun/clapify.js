module.exports = {
	name: "clapify",
	category: "Fun",
	description: "Generate clapified 👏 text 👏",
	aliases: [],
	usage: "clapify <text>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text (eg. `meme review`).",
			);
		}
		if(args[0].length > 1024) {
			return message.channel.send(
				"`❌` You have exceeded the 1024 characters limit.",
			);
		}

		let text;
		const txt = args.join(" ");
		if(/\s/.test(txt)) {
			text = args.join(" 👏 ");
		}
		else {
			text = args.join(" ").split("").join(" 👏 ");
		}
		message.channel.send(`${text} 👏`);
	},
};