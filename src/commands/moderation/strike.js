const db = require('quick.db');
const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'strike',
	category: 'Moderation',
	description: 'Warn a specified user for breaking the rules.',
	aliases: ['warn'],
	usage: 'strike <user> [amount] <reason>',
	guildOnly: true,
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel || channel === null) return;

		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Kick Members',
			);
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid user.',
			);
		}

		if(member.user.bot) {
			return message.channel.send(
				'<:vError:725270799124004934> Bots are not allowed to have strikes.',
			);
		}

		if(message.author.id === member.id) {
			return message.channel.send(
				'<:vError:725270799124004934> You are not allowed to warn yourself.',
			);
		}

		if(member.id === message.guild.owner.id) {
			return message.channel.send(
				'<:vWarning:725276167346585681> Are you trying to get yourself into trouble?',
			);
		}

		let Reason;
		let amount = args[1];
		if (isNaN(args[1])) {
			amount = 1;
			Reason = args.slice(1).join(' ');
		}

		else {
			amount = Number(args[1]);
			Reason = args.slice(2).join(' ');
			if(!Reason) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a reason.',
				);
			}
		}

		const warnings = db.get(`warnings_${message.guild.id}_${member.id}`);

		if(warnings <= 0) {
			try {
				await member.send(`You have been given ${amount}strikes in ${message.guild}\n\`[Reason]\` ${Reason}`);
			}
			catch(err) {
				await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}

			db.set(`warnings_${message.guild.id}_${member.id}`, amount);
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${message.author.username}**#${message.author.discriminator} gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator}`,
			).then(message.delete());
		}
		else {
			try {
				await member.send(`You have been given ${amount} strikes in ${message.guild}\n\`[Reason]\` ${Reason}`);
			}
			catch(err) {
				await channel.send(`<:vError:725270799124004934> Failed to DM **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})`);
			}

			db.add(`warnings_${message.guild.id}_${member.id}`, amount);
			channel.send(
				`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${message.author.username}**#${message.author.discriminator} gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator} (ID: ${member.id})\n\`[Reason]\` ${Reason}`,
			);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully gave \`${amount}\` strikes to **${member.user.username}**#${member.user.discriminator}`,
			).then(message.delete());
		}


	},
};