const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Guild = require('../../models/guild');

module.exports = {
	name: 'nuke',
	category: 'Moderation',
	description: 'Clones the current channel and deletes the old one.',
	aliases: [],
	usage: 'nuke',
	run: async (client, message, args) => {
		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});
		const logs = settings.settings.modlog;
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;

		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ADMINISTRATOR` required.',
			);
		}

		if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `MANAGE_CHANNELS` required.',
			);
		}

		let Reason = args.slice(1).join(' ');
		if (!Reason) {
			Reason = 'No reason provided';
		}
		else {
			Reason = args.slice(1).join(' ');
		}

		await message.channel.clone().then((ch) =>{
			ch.setParent(message.channel.parent.id);ch.setPosition(message.channel.position);
			const embed = new MessageEmbed()
				.setTitle('This channel has been NUKED!')
				.setColor('#36393f')
				.setImage('https://images-ext-1.discordapp.net/external/rGT3vhB8xqYng_StlUaV3jNAgdIpo9SISDskCjxq5Ug/%3Fcid%3D790b7611e787b306d4cf5d03b88cc2c6870eb35b8f37e008%26rid%3Dgiphy.gif/https/media1.giphy.com/media/uSHMDTUL7lKso/giphy.gif');
			ch.send(embed);
		}); message.channel.delete();

		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` ☢ \`${message.channel.name}\` has been nuked by **${message.author.username}**#${message.author.discriminator}\n\`[Reason]\` ${Reason}`,
		);
	},
};