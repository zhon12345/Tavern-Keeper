module.exports = {
	name: "dm",
	category: "Owner",
	description: "Direct message a specified user as the bot.",
	aliases: ["message"],
	usage: "dm <text>",
	disabled: false,
	userperms: ["BOT_OWNER"],
	botperms: [],
	run: async (client, message, args) => {
		const member = message.mentions.users.first() || await client.users.fetch(args[0]);
		if (!member) {
			return message.channel.send(
				"`❌` User not found, please provide a valid user. (eg. `@zhon12345#8585`)",
			);
		}

		const text = args.slice(1).join(" ");
		if(!text) {
			return message.channel.send(
				"`❌` Text not found, please provide valid text.",
			);
		}

		try{
			member.send(text);
			await message.channel.send(
				`\`✔️\` Successfully sent a DM to \`${member.username}#${member.discriminator}\`.`,
			);
		}
		catch (e) {
			return message.channel.send(
				"`❌` An error occurred, please try again!",
			);
		}
	},
};