const { BOT_OWNER } = process.env;
const Guild = require('../../models/guild');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'blacklist',
	category: 'Owner',
	description: 'Add or Remove a specified guild from the blacklist.',
	aliases: [],
	usage: 'blacklist [add/remove] [guild]',
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			);
		}

		let guild;
		if (args[0]) {
			if(isNaN(args[1])) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid guild id.',
				);
			}
			else {
				guild = args[1];
			}
		}

		const settings = await Guild.findOne({
			guildID: guild,
		});

		if (args[0].toLowerCase() === 'add') {
			if(settings.blacklisted === true) {
				return message.channel.send(
					'<:vError:725270799124004934> The specified guild is already blacklisted.',
				);
			}
			else {
				await Guild.updateOne(
					{
						guildID: guild,
					},
					{
						blacklisted: true,
					});
				message.channel.send(
					`<:vSuccess:725270799098970112> Successfully added ${client.guilds.cache.get(guild)} to blacklist.`,
				).then(message.delete());
			}
		}
		else if (args[0].toLowerCase() === 'remove') {
			if(settings.blacklisted === false) {
				return message.channel.send(
					'<:vError:725270799124004934> The specified guild is not blacklisted.',
				);
			}
			else {
				await Guild.updateOne(
					{
						guildID: guild,
					},
					{
						blacklisted: false,
					});
				message.channel.send(
					`<:vSuccess:725270799098970112> Successfully removed ${settings.guildName} to blacklist.`,
				).then(message.delete());
			}
		}
		else {
			const isBlacklisted = await Guild.find(
				{
					blacklisted: true,
				},
			);

			const blacklisted = isBlacklisted.map(guilds => `${guilds.guildName} (${guilds.guildID})`.toString());

			const embed = new MessageEmbed()
				.setTitle('Blacklisted guilds')
				.setDescription(blacklisted.length !== 0 ? blacklisted : 'None')
				.setColor('BLUE');
			return message.channel.send(embed);
		}
	},
};