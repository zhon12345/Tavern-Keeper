const { isInvite } = require("../../functions");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
	name: "inviteinfo",
	category: "Info",
	description: "Displays in-depth information about a specified invite code in the current guild.",
	aliases: ["ii"],
	usage: "inviteinfo",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const code = args[0];
		if(!code || isInvite(code)) {
			return message.channel.send(
				"`❌` Invite code not found, please provide a valid invite code (eg. `QUTBrY4r`).",
			);
		}

		const invites = await message.guild.fetchInvites();
		const invite = invites.find(i => i.code === code);
		if(!invite) {
			return message.channel.send(
				"`❌` Invite code not found, please provide a valid invite code (eg. `QUTBrY4r`).",
			);
		}

		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor("BLUE")
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setTitle("Invite Information")
			.addField("<:documents:773950876347793449> General ❯", [
				`> **\\👑 Creator: ${invite.inviter}**`,
				`> **\\🌐 Guild: \`${invite.guild}\`**`,
				`> **\\📺 Channel: ${invite.channel}**`,
				`> **\\📅 Created: \`${moment(invite.createdTimestamp).format("MMMM Do YYYY, h:mm:ss")}\` | \`${Math.floor((Date.now() - invite.createdTimestamp) / 86400000)}\` day(s) ago**`,
				"\u200b",
			])
			.addField("<:documents:773950876347793449> Invite ❯", [
				`> **\\🎫 Code: \`${invite.code}\`**`,
				`> **\\🔗 URL: [\`Click here!\`](${invite.url})**`,
				`> **\\👥 Max Uses: \`${invite.uses} / ${invite.maxUses === 0 ? "∞" : invite.maxUses}\` Uses**`,
				`> **\\📅 Expires: ${invite.expiresTimestamp ? `\`${moment(invite.expiresTimestamp).format("MMMM Do YYYY, h:mm:ss")}\` | \`${Math.floor((invite.expiresTimestamp - Date.now()) / 86400000)}\` day(s) later` : "`Never`"}**`,
			]);
		message.channel.send(embed);

	},
};