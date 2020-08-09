const moment = require('moment');
const Guild = require('../../models/guild');


module.exports = {
	name: 'clear',
	category: 'Moderation',
	description: 'Clear up to 99 messages in a specified channel.',
	aliases: ['purge', ' prune'],
	usage: 'clear <amount> [reason]',
	guildOnly: true,
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel || channel === null) return;

		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Manage Messages.',
			);
		}

		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid number.',
			);
		}
		else if (amount <= 0 || amount > 100) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid number between 1 and 99.',
			);
		}

		let Reason;
		if(!Reason) {
			Reason = 'No reason specified';
		}
		else {
			Reason = args.slice().join(' ');
		}

		message.channel.bulkDelete(amount + 1, true);
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🗑️ **${message.author.username}**#${message.author.discriminator} cleared \`${amount}\`messages in ${message.channel} \n\`[Reason]\` ${Reason}`,
		);
		await message.channel.send(
			`<:vSuccess:725270799098970112> Successfully cleared \`${amount}\`messages`,
		);
	},
};