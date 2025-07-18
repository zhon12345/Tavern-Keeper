module.exports = {
	name: "leave",
	category: "Owner",
	description: "Make the bot leave a specified server.",
	aliases: ["abandon"],
	usage: "leave <guild>",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]);
		if (!guild) {
			return message.channel.send(
				"`❌` Guild ID not found, please provide a valid guild ID. (eg. `450846546867519503`)",
			);
		} else {
			guild.leave();
			await message.channel.send(`\`✔️\` Successfully left ${guild.name} (ID:${guild.id})`);
		}
	},
};
