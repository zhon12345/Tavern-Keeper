const { BOT_OWNER } = process.env;

module.exports = {
	name: "say",
	category: "Owner",
	description: "Make the bot say whatever you want.",
	aliases: ["imitate"],
	usage: "say <text>",
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return;
		}

		const text = args.slice().join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid text.",
			);
		}
		message.channel.send(text);
	},
};