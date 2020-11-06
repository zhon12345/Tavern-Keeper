/* eslint-disable no-unused-vars */
const { MessageEmbed, version: djsversion } = require("discord.js");
const { formatBytes, parseDur } = require("../../functions.js");
const moment = require("moment");
const os = require("os");
const cpuStat = require("cpu-stat");
const { BOT_OWNER } = process.env;

const formatOS = {
	aix: "IBM AIX",
	darwin: "Darwin",
	freebsd: "FreeBSD",
	linux: "Linux",
	openbsd: "OpenBSD",
	sunos: "SunOS",
	win32: "Windows",
};

module.exports = {
	name: "botinfo",
	category: "Info",
	description: "Displays indept information about the bot.",
	aliases: ["bot", "bi"],
	usage: "botinfo",
	run: async (client, message, args) => {
		cpuStat.usagePercent(function(error, percent, seconds) {
			if(error) {
				return console.error(error);
			}
			const core = os.cpus()[0];
			const embed = new MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setColor(message.guild.members.cache.get(client.user.id).displayHexColor)
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setTitle("Bot Information")
				.addField("<:documents:773950876347793449> General ❯", [
					`> **\\👑 Owner: \`${client.users.cache.get(BOT_OWNER).tag}\`**`,
					`> **\\🌐 Servers: \`${client.guilds.cache.size.toLocaleString()}\` Servers**`,
					`> **\\👥 Users: \`${client.users.cache.size.toLocaleString()}\` Users**`,
					`> **\\📺 Channels: \`${client.channels.cache.size.toLocaleString()}\` Channels**`,
					`> **\\💬 Commands: \`${client.commands.size}\` Commands**`,
					"\u200b",
				])
				.addField("<:documents:773950876347793449> System ❯", [
					`> **<:nodejs:773599989724348448> Node.js: \`${process.version}\`**`,
					`> **<:djs:773599989833400371> Discord.js: \`v${djsversion}\`**`,
					`> **\\🖥 Platform: \`${formatOS[os.platform]}\`**`,
					`> **\\📊 Memory: \`${formatBytes(process.memoryUsage().heapUsed)} / ${formatBytes(process.memoryUsage().heapTotal)}\`**`,
					`> **\\💻 CPU: \`${core.model}\`**`,
					"\u200b",
				])
				.addField("<:documents:773950876347793449> Others ❯", [
					`> **<:online:745651877382717560> Uptime: ${parseDur(client.uptime)}**`,
					`> **\\📅 Created: \`${moment(client.user.createdTimestamp).format("MMMM Do YYYY, h:mm:ss")}\` | \`${Math.floor((Date.now() - client.user.createdTimestamp) / 86400000)}\` day(s) ago**`,
				]);
			message.channel.send(embed);
		});
	},
};