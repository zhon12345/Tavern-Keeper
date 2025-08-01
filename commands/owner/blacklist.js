const Blacklist = require("../../models/blacklist");
const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");

module.exports = {
	name: "blacklist",
	category: "Owner",
	description: "Add or Remove a specified member from the blacklist.",
	aliases: [],
	usage: "blacklist [add/remove] [member]",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
		if (!args[0]) {
			Blacklist.find({}, async (err, data) => {
				if (data && data.length > 0) {
					let response;
					try {
						response = await sourcebin.create(
							[
								{
									name: " ",
									content: data
										.map((u) => u)
										.map((u, i) => {
											return `${i + 1} - ${client.users.cache.get(u.id).tag}\nID: ${u.id}\n`;
										})
										.join("\n"),
									languageId: "text",
								},
							],
							{
								title: `${client.user.username} user blacklist`,
								description: " ",
							},
						);
					} catch {
						return message.channel.send("`❌` An error occurred, please try again!");
					}
					const embed = new MessageEmbed()
						.setColor("BLUE")
						.setDescription(
							`There are currently **${data.length}** blacklisted users.${data.length > 10 ? `\nThe blacklist exceeds the character limit, click [here](${response.url}) for the full list.` : ""}`,
						)
						.addField(
							"Users",
							data
								.map((u) => u)
								.map((u, i) => {
									return `**${i + 1}** - ${client.users.cache.get(u.id)} (\`${u.name}\`)\nID: \`${u.id}\`\n`;
								})
								.slice(0, 10)
								.join("\n"),
						);
					message.channel.send(embed);
				} else {
					return message.channel.send("`⚠️` There are currently no blacklisted users.");
				}
			});
		} else if (args[0].toLowerCase() === "add") {
			if (!member) {
				return message.channel.send("`❌` User not found, please provide a valid user. (eg. `@zhon12345#8585`)");
			}

			Blacklist.findOne({ id: member.user.id }, async (err, data) => {
				if (err) throw err;
				if (data) {
					message.channel.send(`\`❌\` \`${member.user.tag}\` has already been blacklisted.`);
				} else {
					data = new Blacklist({
						name: member.user.username,
						id: member.user.id,
					});
					data.save();
					message.channel.send(`\`✔️\` \`${member.user.tag}\` has been added to the blacklist.`);
				}
			});
		} else if (args[0].toLowerCase() === "remove") {
			if (!member) {
				return message.channel.send("`❌` User not found, please provide a valid user. (eg. `@zhon12345#8585`)");
			}

			Blacklist.findOne({ id: member.user.id }, async (err, data) => {
				if (err) throw err;
				if (data) {
					await Blacklist.findOneAndDelete({ id: member.user.id });
					message.channel.send(`\`✔️\` \`${member.user.tag}\` has been removed from the blacklist.`);
				} else {
					message.channel.send(`\`❌\` \`${member.user.tag}\` has not been blacklisted.`);
				}
			});
		} else {
			return message.channel.send("`❌` Valid argument not found, please provide valid arguments (eg. `add`).");
		}
	},
};
