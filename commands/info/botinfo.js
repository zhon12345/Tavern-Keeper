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
				return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
			}
			const core = os.cpus()[0];
			const embed = new MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setColor(client.displayHexColor || "BLUE")
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setTitle("Bot Information")
				.addFields(
					{ name: "Bot Name", value: `\`\`\`${client.user.username}\`\`\``, inline:true },
					{ name: "Bot ID", value: `\`\`\`${client.user.id}\`\`\``, inline:true },
					{ name: "Bot Owner", value: `\`\`\`${client.users.cache.get(BOT_OWNER).tag}\`\`\`` },
					{ name: "Servers", value: `\`\`\`${client.guilds.cache.size.toLocaleString()}\`\`\``, inline:true },
					{ name: "Users", value: `\`\`\`${client.users.cache.size.toLocaleString()}\`\`\``, inline:true },
					{ name: "Commands", value: `\`\`\`${client.commands.size}\`\`\``, inline:true },
					{ name: "Uptime", value: `\`\`\`${parseDur(client.uptime)}\`\`\`` },
					{ name: "Node.js Version", value: `\`\`\`${process.version}\`\`\``, inline:true },
					{ name: "Discord.js Version", value: `\`\`\`v${djsversion}\`\`\``, inline:true },
					{ name: "Platform", value: `\`\`\`${formatOS[os.platform]}\`\`\``, inline:true },
					{ name: "CPU", value: `\`\`\`${core.model}\`\`\`` },
					{ name: "Memory", value: `\`\`\`${formatBytes(process.memoryUsage().heapUsed)} Used\`\`\`` },
					{ name: "Created", value: `\`\`\`${moment(client.user.createdTimestamp).format("MMMM Do YYYY, h:mm:ss")} | ${Math.floor((Date.now() - client.user.createdTimestamp) / 86400000)} day(s) ago\`\`\`` },
				);
			message.channel.send(embed);
		});
	},
};