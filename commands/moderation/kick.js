const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "kick",
	category: "Moderation",
	description: "Kick a specified user from the server.",
	aliases: [],
	usage: "kick <user> [reason]",
	disabled: false,
	userperms: ["KICK_MEMBERS"],
	botperms: ["KICK_MEMBERS"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) {
			return message.channel.send(
				"`❌` User not found, please provide a valid user. (eg. `@zhon12345#8585`)",
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				"`❌` You are not allowed to kick yourself.",
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				"`❌` You are not allowed to kick me.",
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				"`⚠️` Are you trying to get yourself into trouble?",
			);
		}

		let Reason = args.slice(1).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(1).join(" ");
		}

		if (!member.kickable) {
			return message.channel.send(
				"`❌` An error occurred, I am unable to kick this user.",
			);
		}

		try {
			await member.send(`You have been kicked from ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			if(channel) {
				await channel.send(`\`❌\` Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}
		}

		member.kick({ reason: Reason });
		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` 👢 **${message.author.username}**#${message.author.discriminator} kicked **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`\`✔️\` Successfully kicked **${member.user.username}**#${member.user.discriminator}`,
		).then(message.delete());
	},
};
