const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "move",
	category: "Moderation",
	description: "Move a specified user from a voice channel.",
	aliases: [],
	disabled: false,
	userperms: ["MOVE_MEMBERS"],
	botperms: ["MOVE_MEMBERS"],
	usage: "move <user> <channel> [reason]",
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const logchannel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) {
			return message.channel.send(
				"`❌` User not found, please provide a valid user. (eg. `@zhon12345#8585`)",
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				"`❌` You are not allowed to move yourself.",
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				"`❌` You are not allowed to move me.",
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				"`⚠️` Are you trying to get yourself into trouble?",
			);
		}

		const channel = message.guild.channels.cache.get(args[1]);
		if(!channel || channel.type !== "voice") {
			return message.channel.send(
				"`❌` Voice channel ID not found, please provide a valid voice channel ID. (eg. `743797576800927785`)",
			);
		}

		if (!member.voice.channel) {
			return message.channel.send(
				"`❌` That member is not in a voice channel.",
			);
		}

		let Reason = args.slice(2).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(2).join(" ");
		}

		try {
			await member.send(`You have been moved from \`${member.voice.channel.name}\` to \`${channel.name}\`\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			if(logchannel) {
				await logchannel.send(`\`❌\` Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}
		}

		member.voice.setChannel(channel);
		if(logchannel) {
			logchannel.send(
				`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` ➡ **${message.author.username}**#${message.author.discriminator} moved **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}) from \`${member.voice.channel.name}\` to \`${channel.name}\`\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`\`✔️\` Successfully moved **${member.user.username}**#${member.user.discriminator} from \`${member.voice.channel.name}\` to \`${channel.name}\``,
		).then(message.delete());
	},
};