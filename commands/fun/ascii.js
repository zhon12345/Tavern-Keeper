/* eslint-disable no-useless-escape */
const figlet = require("figlet");

module.exports = {
	name: "ascii",
	category: "Fun",
	description: "Get a nice ascii art.",
	aliases: ["art"],
	usage: "ascii <message>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const regexp = "\\u00a9|\\u00ae|\[\\u2000-\\u3300\]|\\ud83c\[\\ud000-\\udfff\]|\\ud83d\[\\ud000-\\udfff\]|\\ud83e\[\\ud000-\\udfff\]";
		const text = args.slice().join(" ");
		if(!text || text.match(regexp)) {
			return message.channel.send(
				"`❌` Text not found, please provide text to draw. (eg. `Hello`)",
			);
		}
		else if(text.length > 20) {
			return message.channel.send(
				"`❌` You have exceeded the 20 characters limit.",
			);
		}

		figlet(text, function(err, data) {
			if(err) {
				return message.channel.send(
					"`❌` An error occurred, please try again!",
				);
			}
			else {
				return message.channel.send(`\`\`\`${data}\`\`\``);
			}
		});
	},
};