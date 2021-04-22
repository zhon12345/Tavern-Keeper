module.exports = {
	name: "clapify",
	category: "Fun",
	description: "Generate clapified 👏 text 👏",
	aliases: [],
	usage: "clapify <text>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				"<:vError:725270799124004934> Text not found, please provide valid text (eg. `meme review`).",
			);
		}
		if(args[0].length > 2000) {
			return message.channel.send("<:vError:725270799124004934> The provided message exceeds 2000 characters.");
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