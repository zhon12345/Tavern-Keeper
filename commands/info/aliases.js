const { capitalizeFirstLetter } = require("../../functions");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "aliases",
	category: "Info",
	description: "Shows you a list of aliases for the specified command.",
	aliases: [],
	usage: "aliases <command>",
	disabled: false,
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
		if (!cmd) {
			return message.channel.send("`❌` Command not found, please provide a valid command (eg. `help`).");
		}

		const embed = new MessageEmbed()
			.setTitle(`Aliases for ${capitalizeFirstLetter(cmd.name.toString().toLowerCase())}`)
			.setDescription(cmd.aliases.length ? cmd.aliases.map((a) => `\`${a}\``).join(", ") : "`None`")
			.setColor("BLUE")
			.setFooter(`Requested by ${message.author.tag}`)
			.setTimestamp();
		return message.channel.send(embed);
	},
};
