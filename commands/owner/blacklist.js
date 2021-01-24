const Blacklist = require("../../models/blacklist");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "blacklist",
	category: "Owner",
	description: "Add or Remove a specified member from the blacklist.",
	aliases: [],
	usage: "blacklist [add/remove] [member]",
	userperms: ["BOT_OWNER"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
		if(args[0] === "add") {
			if (!member) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide a valid user.",
				);
			}

			Blacklist.findOne({ id : member.user.id }, async (err, data) => {
				if(err) throw err;
				if(data) {
					message.channel.send(`<:vError:725270799124004934> \`${member.user.tag}\` has already been blacklisted.`);
				}
				else {
					data = new Blacklist({
						name: member.user.username,
						id : member.user.id,
					});
					data.save();
					message.channel.send(`<:vSuccess:725270799098970112> \`${member.user.tag}\` has been added to blacklist.`);
				}
			});
		}
		else if(args[0] === "remove") {
			if (!member) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide a valid user.",
				);
			}

			Blacklist.findOne({ id : member.user.id }, async (err, data) => {
				if(err) throw err;
				if(data) {
					await Blacklist.findOneAndDelete({ id : member.user.id });
					message.channel.send(`<:vSuccess:725270799098970112> \`${member.user.tag}\` has been removed from blacklist.`);
				}
				else {
					message.channel.send(`<:vError:725270799124004934> \`${member.user.tag}\` has not been blacklisted.`);
				}
			});
		}
		else {
			Blacklist.find({}, (err, data) => {
				if(data) {
					const embed = new MessageEmbed()
						.setTitle("Blacklisted Users")
						.setColor("BLUE")
						.setDescription(data.map(u => {return `> **Username: ${client.users.cache.get(u.id)} (\`${u.name}\`)**\n> **User ID: \`${u.id}\`**\n`;}).join("\n"));
					message.channel.send(embed);
				}
				else {
					return message.channel.send(
						"<:vWarning:725276167346585681> There is no blacklisted member",
					);
				}
			});
		}
	},
};