const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "move",
	category: "Moderation",
	description: "Move a specified user from a voice channel.",
	aliases: [],
	userperms: ["MOVE_MEMBERS"],
	botperms: ["USE_EXTERNAL_EMOJIS", "MOVE_MEMBERS"],
	usage: "move <user> <channel> [reason]",
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const logchannel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid user.",
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed to move yourself.",
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				"<:vError:725270799124004934> You are not allowed to move me.",
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				"<:vWarning:725276167346585681> Are you trying to get yourself into trouble?",
			);
		}

		const channel = message.guild.channels.cache.get(args[1]);
		if(!channel || channel.type !== "voice") {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid voice channel.",
			);
		}

		if (!member.voice.channel) {
			return message.channel.send(
				"<:vError:725270799124004934> That member is not in a voice channel.",
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
				await logchannel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}
		}

		member.voice.setChannel(channel);
		if(logchannel) {
			logchannel.send(
				`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` ➡ **${message.author.username}**#${message.author.discriminator} moved **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}) from \`${member.voice.channel.name}\` to \`${channel.name}\`\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully moved **${member.user.username}**#${member.user.discriminator} from \`${member.voice.channel.name}\` to \`${channel.name}\``,
		).then(message.delete());
	},
};