const { MessageEmbed } = require("discord.js");
const moment = require("moment");

const flags = {
	DISCORD_EMPLOYEE: "<:staff:773961079495196753>",
	PARTNERED_SERVER_OWNER: "<:partner:773961079185080362>",
	HYPESQUAD_EVENTS: "<:hypesquad:773961079508303892>",
	BUGHUNTER_LEVEL_1: "<:bug:773961078245818389>",
	HOUSE_BRAVERY: "<:brave:773961077938454568>",
	HOUSE_BRILLIANCE: "<:brillance:773961078114615366>",
	HOUSE_BALANCE: "<:balance:773961077607628810>",
	EARLY_SUPPORTER: "<:early:773961079100932166>",
	BUGHUNTER_LEVEL_2: "<:bug2:773961078677045289>",
	VERIFIED_BOT: "<:verifiedbot:773961079583670322>",
	EARLY_VERIFIED_BOT_DEVELOPER: "<:earlydev:773961079200940074>",
};

const Presence = {
	offline: "<:offline:745651876552376402> `Offline`",
	online: "<:online:745651877382717560> `Online`",
	idle: "<:idle:773964101390958632> `Idle`",
	dnd: "<:dnd:773964313630998538> `Do Not Disturb`",
};

module.exports = {
	name: "userinfo",
	category: "Info",
	description: "Displays information about a provided user or the message author.",
	aliases: ["user", "ui"],
	usage: "userinfo [user]",
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
		const roles = member.roles.cache.map(role => role.name.toString());
		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(member.displayHexColor || "BLUE")
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.setTitle("User Information")
			.addField("<:documents:773950876347793449> User ❯", [
				`> **<:card:773965449402646549> Username: \`${member.user.tag}\`**`,
				`> **\\📇 User ID: \`${member.id}\`**`,
				`> **\\👦 Avatar: [Click here!](${member.user.displayAvatarURL({ dynamic: true })})**`,
				`> **\\📛 Badges: ${member.user.flags.toArray().length ? member.user.flags.toArray().map(flag => flags[flag]).join("") : "None"}**`,
				`> **<:online:745651877382717560> Status: ${Presence[member.user.presence.status]}**`,
				`> **\\📅 Created: \`${moment(member.user.createdTimestamp).format("MMMM Do YYYY, h:mm:ss")}\` | \`${Math.floor((Date.now() - member.user.createdTimestamp) / 86400000)}\` day(s) ago**`,
				"\u200b",
			])
			.addField("<:documents:773950876347793449> Member ❯", [
				`> **<:card:773965449402646549> Display Name: \`${member.displayName}\`**`,
				`> **\\🥇 Highest Role: \`${member.roles.highest.id === message.guild.id ? "None" : member.roles.highest.name}\`**`,
				`> **\\🏆 Hoisted: \`${member.roles.hoist ? "Yes" : "No"}\`**`,
				`> **\\🏅 Roles: \`${roles.length - 1}\` Roles**`,
				`> **\\📥 Joined: \`${moment(member.joinedAt).format("MMMM Do YYYY, h:mm:ss")}\` | \`${Math.floor((Date.now() - member.joinedAt) / 86400000)}\` day(s) ago**`,
			]);
		return message.channel.send(embed);
	},
};