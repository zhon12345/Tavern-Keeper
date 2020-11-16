const { MessageEmbed } = require("discord.js");
const Guild = require("../../models/guild");
const moment = require("moment");

module.exports = {
	name: "nuke",
	category: "Moderation",
	description: "Clones the current channel and deletes the old one.",
	aliases: [],
	usage: "nuke [channel]",
	userperms: ["ADMINISTRATOR"],
	botperms: ["USE_EXTERNAL_EMOJIS", "MANAGE_CHANNELS"],
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const logchannel = message.guild.channels.cache.get(settings.settings.modlog);
		if (!logchannel) return;

		let Reason = args.slice(1).join(" ");
		if (!Reason) {
			Reason = "No reason provided";
		}
		else {
			Reason = args.slice(1).join(" ");
		}

		const channel = message.guild.channels.mentions.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		await channel.clone().then((ch) => {
			ch.setParent(channel.parent.id);ch.setPosition(channel.position);
			const embed = new MessageEmbed()
				.setTitle("This channel has been NUKED!")
				.setColor("#36393f")
				.setImage("https://images-ext-1.discordapp.net/external/rGT3vhB8xqYng_StlUaV3jNAgdIpo9SISDskCjxq5Ug/%3Fcid%3D790b7611e787b306d4cf5d03b88cc2c6870eb35b8f37e008%26rid%3Dgiphy.gif/https/media1.giphy.com/media/uSHMDTUL7lKso/giphy.gif");
			ch.send(embed);
		}); channel.delete();

		logchannel.send(
			`\`[${moment(message.createdTimestamp).format("HH:mm:ss")}]\` ☢ \`${message.channel.name}\` has been nuked by **${message.author.username}**#${message.author.discriminator}\n\`[Reason]\` ${Reason}`,
		);
	},
};