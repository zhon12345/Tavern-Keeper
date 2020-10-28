const { BOT_OWNER } = process.env;

module.exports = {
	name: 'leave',
	category: 'Owner',
	description: 'Make the bot leave a specified server.',
	aliases: ['abandon'],
	usage: 'leave <guild>',
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			);
		}

		const guild = client.guilds.cache.get(args[0]);
		if(!guild) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid guild id.',
			);
		}
		else {
			guild.leave();
			await message.channel.send(`<:vSuccess:725270799098970112> Successfully left ${guild.name} (ID:${guild.id})`);
		}
	},
};