module.exports = {
	name: 'leave',
	category: 'Owner',
	description: 'Make the bot leave a specified server.',
	aliases: ['abandon'],
	usage: 'leave <guild>',
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]);
		if(!guild) {
			return message.channel.send(
				'`❌` Please provide a valid guild id.',
			);
		}
		else {
			guild.leave();
			await message.channel.send(`\`✔️\` Successfully left ${guild.name} (ID:${guild.id})`);
		}
	},
};