/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports = {
	name: 'nuke',
	category: 'Moderation',
	description: 'Clones the current channel and deletes the old one.',
	aliases: [],
	usage: 'nuke',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Administrator.',
			);
		}

		if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
			return message.channel.send(
				'<:vError:725270799124004934> I must have the following permissions to use that: Manage Channel.',
			);
		}

		let Reason = args[0];
		if(!Reason) {
			Reason = 'No reason specified';
		}
		else {
			Reason = args.slice().join(' ');
		}

		await message.channel.clone().then((ch) =>{
			ch.setParent(message.channel.parent.id);ch.setPosition(message.channel.position);
			const embed = new MessageEmbed()
				.setTitle('This channel has been NUKED!')
				.setColor('#36393f')
				.setImage('https://images-ext-1.discordapp.net/external/rGT3vhB8xqYng_StlUaV3jNAgdIpo9SISDskCjxq5Ug/%3Fcid%3D790b7611e787b306d4cf5d03b88cc2c6870eb35b8f37e008%26rid%3Dgiphy.gif/https/media1.giphy.com/media/uSHMDTUL7lKso/giphy.gif');
			ch.send(embed);
		}); message.channel.delete();

		const logs = db.fetch(`modlog_${message.guild.id}`);
		const channel = message.guild.channels.cache.get(logs);
		if (!channel) return;
		channel.send(
			`\`[${moment(message.createdTimestamp).format('HH:mm:ss')}]\` ☢ ${message.channel.name} has been nuked by **${message.author.username}**#${message.author.discriminator}\n\`[Reason]\` ${Reason}`,
		);
	},
};