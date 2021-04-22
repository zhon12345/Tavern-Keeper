const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "ban",
	category: "Moderation",
	description: "Ban a specified user from the server.",
	aliases: ["banish"],
	usage: "ban <user> [reason]",
	userperms: ["BAN_MEMBERS"],
	botperms: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.users.first() || await client.users.fetch(args[0]);
		if (!member) {
			return message.channel.send(
				"<:vError:725270799124004934> User not found, please provide a valid user. (eg. `@zhon12345#8585`)",
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed to ban yourself.",
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed to ban me.",
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				"<:vWarning:725276167346585681> Are you trying to get yourself into trouble?",
			);
		}

		let Reason = args.slice(1).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(1).join(" ");
		}

		if (!member.bannable) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed ban this user.",
			);
		}

		try {
			await member.send(`You have been banned from ${message.guild}\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			if(channel) {
				await channel.send(`<:vError:725270799124004934> Failed to DM **${member.username}**#${member.discriminator} (ID: ${member.id})`);
			}
		}

		member.ban({ reason: Reason });
		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` 🔨 **${message.author.username}**#${message.author.discriminator} banned **${member.username}**#${member.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully banned **${member.username}**#${member.discriminator}`,
		).then(message.delete());
	},
};