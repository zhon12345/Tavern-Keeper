const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "unban",
	category: "Moderation",
	description: "Unban a specified user from the server.",
	aliases: [],
	usage: "unban <user> [reason]",
	disabled: false,
	userperms: ["BAN_MEMBERS"],
	botperms: ["USE_EXTERNAL_EMOJIS", "BAN_MEMBERS"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const id = args[0];
		if(!id || isNaN(id)) {
			return message.channel.send(
				"`❌` User ID not found, please provide a valid user ID. (eg. `450846017890549761`)",
			);
		}

		const bannedUsers = await message.guild.fetchBans();
		const user = bannedUsers.get(id);
		if (!user) {
			return message.channel.send(
				"`❌` User not found, please provide a valid user ID.",
			);
		}

		let Reason = args.slice(1).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(1).join(" ");
		}

		message.guild.members.unban(user.user);
		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` 🔧 **${message.author.username}**#${message.author.discriminator} unbanned **${user.user.username}**#${user.user.discriminator} (ID: ${user.user.id})\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`\`✔️\` Successfully unbanned **${user.user.username}**#${user.user.discriminator}`,
		).then(message.delete());
	},
};