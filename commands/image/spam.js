/* eslint-disable no-unused-vars */
module.exports = {
	name: "spam",
	category: "Image",
	description: "Sends spam images.",
	aliases: [],
	usage: "spam",
	run: (client, message, args) => {
		if(!message.guild.me.hasPermission("ATTACH_FILES")) {
			return message.channel.send(
				"<:vError:725270799124004934> Insufficient Permission! `ATTACH_FILES` required.",
			);
		}

		message.channel.send({ files: ["./assets/image/spam.jpg"] });
	},
};