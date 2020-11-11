const { MessageEmbed } = require("discord.js");
const { capitalizeFirstLetter } = require("../../functions");

module.exports = {
	name: "aliases",
	category: "Info",
	description: "Shows you a list of aliases for the specified command.",
	aliases: [],
	usage: "aliases <command>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		if(args[0]) {
			const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
			if(!cmd) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provied a vaild command.",
				);
			}
			else {
				let alias;
				if(cmd.aliases.length === 0) {
					alias = "`None`";
				}
				else {
					alias = cmd.aliases.map((a) => `\`${a}\``).join(", ");
				}
				const embed = new MessageEmbed()
					.setTitle(`Aliases for ${capitalizeFirstLetter(cmd.name.toString().toLowerCase())}`)
					.setDescription(alias)
					.setColor("BLUE")
					.setFooter(`Requested by ${message.author.tag}`)
					.setTimestamp();
				return message.channel.send(embed);
			}
		}
		else{
			return message.channel.send(
				"<:vError:725270799124004934> Please provied a vaild command.",
			);
		}

	},
};
