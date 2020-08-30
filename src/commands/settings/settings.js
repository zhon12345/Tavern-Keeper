/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const Guild = require('../../models/guild');

module.exports = {
	name: 'settings',
	category: 'Settings',
	description: 'Displays the server\'s settings.',
	aliases: ['setting'],
	usage: 'settings',
	run: async (client, message, args) => {
		if(!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Ban Members.',
			);
		}

		const settings = await Guild.findOne({
			guildID: message.guild.id,
		});

		const muterole = message.guild.roles.cache.get(settings.settings.muterole);
		const verifiedrole = message.guild.roles.cache.get(settings.settings.verifyrole);
		const modlog = message.guild.channels.cache.get(settings.settings.modlog);
		const serverlog = message.guild.channels.cache.get(settings.settings.serverlog);
		const messagelog = message.guild.channels.cache.get(settings.settings.messagelog);
		const joinchannel = message.guild.channels.cache.get(settings.welcomer.joinchannel);
		const leavechannel = message.guild.channels.cache.get(settings.welcomer.leavechannel);

		const embed = new MessageEmbed()
			.setTitle(`**${client.user.username} settings for ${message.guild.name}**`)
			.setColor('BLUE')
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp()
			.addFields(
				{ name: 'Prefix', value: `\`\`\`${settings.prefix}\`\`\`` },
				{ name: 'Anti Profanity', value: `\`\`\`${settings.settings.antiprofanity ? 'On' : 'Off'}\`\`\``, inline:true },
				{ name: 'Anti Links', value: `\`\`\`${settings.settings.antilinks ? 'On' : 'Off'}\`\`\``, inline:true },
				{ name: 'Muted Role', value: `\`\`\`${settings.settings.muterole ? muterole.name : ' None'}\`\`\`` },
				{ name: 'Verified Role', value: `\`\`\`${settings.settings.verifyrole ? verifiedrole.name : ' None'}\`\`\`` },
				{ name: 'Mod Log', value: `\`\`\`${settings.settings.modlog ? modlog.name : ' None'}\`\`\`` },
				{ name: 'Server Log', value: `\`\`\`${settings.settings.serverlog ? serverlog.name : ' None'}\`\`\`` },
				{ name: 'Message Log', value: `\`\`\`${settings.settings.messagelog ? messagelog.name : ' None'}\`\`\`` },
				{ name: '\u200b', value: '**Welcomer**' },
				{ name: 'Join channel', value: `\`\`\`${settings.welcomer.joinchannel ? joinchannel.name : ' None'}\`\`\``, inline:true },
				{ name: 'Leave channel', value: `\`\`\`${settings.welcomer.leavechannel ? leavechannel.name : ' None'}\`\`\``, inline:true },
				{ name: 'Join message', value: `\`\`\`${settings.welcomer.jointext ? settings.welcomer.jointext : 'None'}\`\`\`` },
				{ name: 'Leave message', value: `\`\`\`${settings.welcomer.leavetext ? settings.welcomer.leavetext : 'None'}\`\`\`` },
			);

		return message.channel.send(embed);
	},
};