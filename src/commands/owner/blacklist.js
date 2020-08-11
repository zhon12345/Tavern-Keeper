const { BOT_OWNER } = process.env;
const Guild = require('../../models/guild');

module.exports = {
	name: 'blacklist',
	category: 'Owner',
	description: 'Blacklist/Unblacklist a specified guild.',
	aliases: [],
	usage: 'blacklist [add/remove] [guild]',
	guildOnly: true,
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

		if (args[0] === 'add') {
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
					`<:vSuccess:725270799098970112> Sucessfully added ${client.guilds.cache.get(guild)} to blacklist.`,
				);
			}
		}
		else if (args[0] === 'remove') {
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
					`<:vSuccess:725270799098970112> Sucessfully removed ${settings.guildName} to blacklist.`,
				);
			}
		}
	},
};