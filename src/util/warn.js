const User = require('../models/user');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports = {
	warn: async function(client, message, channel, reason) {
		User.findOne({
			guildID: message.guild.id,
			userID: message.author.id,
		}, async (data) => {
			if (!data) {
				const newUser = new User({
					_id: mongoose.Types.ObjectId(),
					guildID: message.guild.id,
					userID: message.author.id,
					warnings: 1,
				});

				newUser.save();

				try {
					await message.author.send(`You have been given \`1\` strikes in ${message.guild}\n\`[Reason]\` ${reason} in ${message.channel}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})`);
				}

				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` ${reason} in ${message.channel}`,
				);
			}
			else {
				data.warnings += 1;
				data.save();
				try {
					await message.author.send(`You have been given \`1\` strikes in ${message.guild}\n\`[Reason]\` ${reason} in ${message.channel}`);
				}
				catch(err) {
					await channel.send(`<:vError:725270799124004934> Failed to DM **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})`);
				}

				channel.send(
					`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` 🚩 **${client.user.username}**#${client.user.discriminator} gave \`1\` strikes to **${message.author.username}**#${message.author.discriminator} (ID: ${message.author.id})\n\`[Reason]\` ${reason} in ${message.channel}`,
				);
			}
		});
	},
};