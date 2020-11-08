/* eslint-disable no-unused-vars */
const { BOT_OWNER } = process.env;

module.exports = {
	name: "dm",
	category: "Owner",
	description: "Direct message a specified user as the bot.",
	aliases: ["message"],
	usage: "dm <text>",
	run: async (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return;
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
		if (!member) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid user.",
			);
		}

		const text = args.slice(1).join(" ");
		if(!text) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid text.",
			);
		}

		try{
			member.send(text);
			await message.channel.send(
				`<:vSuccess:725270799098970112> Successfully DMed \`${member.user.tag}\`.`,
			);
		}
		catch (e) {
			return message.channel.send(
				"<:vError:725270799124004934> An error occured, please try again!",
			);
		}
	},
};