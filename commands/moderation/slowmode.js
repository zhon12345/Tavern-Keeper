const { parseDur } = require("../../functions");
const ms = require("ms");

module.exports = {
	name: "slowmode",
	aliases: ["slow", "sm"],
	category: "Moderation",
	description: "Set the slowmode for a specific channel.",
	usage: "slowmode [channel] <time>",
	disabled: false,
	userperms: ["MANAGE_CHANNELS"],
	botperms: ["MANAGE_CHANNELS"],
	run: async (client, message, args) => {
		let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]),
			time = args[1];

		if (!channel) {
			time = args[0];
			channel = message.channel;
		}

		if (!args[0]) {
			return message.channel.send(
				`The current slowmode for ${message.channel} is ${parseDur(channel.rateLimitPerUser * 1000)}`,
			);
		}
		else if (args[0].toLowerCase() === "off") {
			channel.setRateLimitPerUser(0);
			return message.channel.send(`\`✔️\` Slowmode for <#${channel.id}> has been deactivated.`);
		}
		else{
			if (!time) return message.channel.send("`❌` Time format not found, please include a valid time format. (eg. `1s`)");

			const convert = ms(time);
			const toSecond = Math.floor(convert / 1000);

			if (!toSecond) return message.channel.send("`❌` Time format not found, please include a valid time format. (eg. `1s`)");

			if (toSecond > 21600) return message.channel.send("`❌` Timer should be less than or equal to 6 hours.");
			else if (toSecond < 1) return message.channel.send("`❌` Timer should be more than or equal to 1 second.");

			await channel.setRateLimitPerUser(toSecond);
			return message.channel.send(
				`\`✔️\` Successfully set slowmode for <#${channel.id}> to **${ms(ms(time), { long: true })}**.`,
			);
		}
	},
};