const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "voicekick",
	category: "Moderation",
	description: "Kick a specified user from a voice channel.",
	aliases: [],
	userperms: ["MOVE_MEMBERS"],
	botperms: ["USE_EXTERNAL_EMOJIS", "MOVE_MEMBERS"],
	usage: "voicekick <user> [reason]",
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
				"<:vWarning:725276167346585681> Are you trying to get yourself into trouble?",
			);
		}

		if (!member.voice.channel) {
			return message.channel.send(
				"`❌` That member is not in a voice channel.",
			);
		}

		let Reason = args.slice(1).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(1).join(" ");
		}

		try {
			await member.send(`You have been voice kicked from \`${member.voice.channel.name}\`\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			if(channel) {
				await channel.send(`\`❌\` Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}
		}

		member.voice.setChannel(null);
		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` 👢 **${message.author.username}**#${message.author.discriminator} voice kicked **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}) from \`${member.voice.channel.name}\`\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`\`✔️\` Successfully voice kicked **${member.user.username}**#${member.user.discriminator} from \`${member.voice.channel.name}\``,
		).then(message.delete());
	},
};