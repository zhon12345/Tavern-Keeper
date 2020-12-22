const fetch = require("node-fetch");

module.exports = {
	name: "hastebin",
	category: "Misc",
	description: "Upload specified text to hastebin.",
	aliases: ["pastebin", "bin"],
	usage: "hastebin <text>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const text = args.slice().join(" ");
		if (!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid text",
			);
		}

		const url = "https://hastebin.com/documents";

		let response;
		try {
			response = await fetch(url, { method: "POST", body: text, headers: { "Content-Type": "text/plain" } }).then(res => res.json());
		}
		catch (e) {
			return message.channel.send("<:vError:725270799124004934> An error occurred, please try again!");
		}

		const { key } = await response.json();
		message.channel.send(`https://hastebin.com/${key}.js`);
	},
};