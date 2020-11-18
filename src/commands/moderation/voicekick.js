const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'voicekick',
	category: 'Moderation',
	description: 'Kick a specified user from a voice channel.',
	aliases: [],
	userperms: ['MOVE_MEMBERS'],
	botperms: ['USE_EXTERNAL_EMOJIS', 'MOVE_MEMBERS'],
	usage: 'voicekick <user> [reason]',
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const channel = message.guild.channels.cache.get(settings.settings.modlog);
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.id === message.author.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to kick yourself.',
			);
		}

		if(member.id === client.user.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to kick me.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			);
		}

		let Reason = args.slice(1).join(' ');
		if (!Reason) {
			Reason = 'No reason provided';
		}
		else {
			Reason = args.slice(1).join(' ');
		}

		if (!member.voice.channel) {
			return message.channel.send(
				'<:vError:725270799124004934> That member is not in a voice channel.',
			);
		}

		try {
			await member.send(`You have been voice kicked from \`${member.voice.channel.name}\`\n\`[Reason]\` ${Reason}`);
		}
		catch(err) {
			await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
		}

		member.voice.setChannel(null);
		if(channel) {
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 👢 **${message.author.username}**#${message.author.discriminator} voice kicked **${member.user.username}**#${member.user.discriminator} (ID: ${member.id}) from \`${member.voice.channel.name}\`\n\`[Reason]\` ${Reason}`,
			);
		}

		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully voice kicked **${member.user.username}**#${member.user.discriminator} from \`${member.voice.channel.name}\``,
		).then(message.delete());
	},
};