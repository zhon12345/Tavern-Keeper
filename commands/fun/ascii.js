/* eslint-disable no-useless-escape */
const figlet = require("figlet");

module.exports = {
	name: "ascii",
	category: "Fun",
	description: "Get a nice ascii art.",
	aliases: ["art"],
	usage: "ascii <message>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const regexp = "\\u00a9|\\u00ae|\[\\u2000-\\u3300\]|\\ud83c\[\\ud000-\\udfff\]|\\ud83d\[\\ud000-\\udfff\]|\\ud83e\[\\ud000-\\udfff\]";
		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide text to draw",
			);
		}
		else if(text.match(regexp)) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occured, please try again!",
			);
		}
		else if(text.length >= 20) {
			return message.channel.send(
				"<:vWarning:725276167346585681> You have exceeded the character limit.",
			);
		}

		figlet(text, function(err, data) {
			if(err) {
				return message.channel.send(
					"<:vError:725270799124004934> An error occured, please try again!",
				);
			}
			else {
				return message.channel.send(`\`\`\`${data}\`\`\``);
			}
		});
	},
};