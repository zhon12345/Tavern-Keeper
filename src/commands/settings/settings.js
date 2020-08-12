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

		const prefix = settings.prefix;
		let antilinks;
		const alinks = settings.settings.antilinks;
		if(alinks === false) {
			antilinks = 'Off';
		}
		else {
			antilinks = 'On';
		}

		let mutedrole;
		const muterole = settings.settings.muterole;
		const mrole = `<@&${muterole}>`;
		if(muterole == null) {
			mutedrole = 'None';
		}
		else {
			mutedrole = mrole;
		}

		let verifiedrole;
		const verifyrole = settings.settings.verifyrole;
		const vrole = `<@&${verifyrole}>`;
		if(verifyrole == null) {
			verifiedrole = 'None';
		}
		else {
			verifiedrole = vrole;
		}

		let modlogs;
		const modlog = settings.settings.modlog;
		const mlog = `<#${modlog}>`;
		if(modlog == null) {
			modlogs = 'None';
		}
		else {
			modlogs = mlog;
		}

		let serverlogs;
		const serverlog = settings.settings.serverlog;
		const slog = `<#${serverlog}>`;
		if(serverlog == null) {
			serverlogs = 'None';
		}
		else {
			serverlogs = slog;
		}

		let messagelogs;
		const messagelog = settings.settings.messagelog;
		const msglog = `<#${messagelog}>`;
		if(messagelog == null) {
			messagelogs = 'None';
		}
		else {
			messagelogs = msglog;
		}

		let joinchnl;
		const joinchannel = settings.welcomer.joinchannel;
		const jchannel = `<#${joinchannel}>`;
		if(joinchannel == null) {
			joinchnl = 'None';
		}
		else {
			joinchnl = jchannel;
		}

		let leavechnl;
		const leavechannel = settings.welcomer.leavechannel;
		const lchannel = `<#${leavechannel}>`;
		if(leavechannel == null) {
			leavechnl = 'None';
		}
		else {
			leavechnl = lchannel;
		}

		let joinmsg;
		const joinmessage = settings.welcomer.jointext;
		if(joinmessage == null) {
			joinmsg = 'None';
		}
		else {
			joinmsg = joinmessage;
		}

		let leavemsg;
		const leavemessage = settings.welcomer.leavetext;
		if(leavemessage == null) {
			leavemsg = 'None';
		}
		else {
			leavemsg = leavemessage;
		}

		const embed = new MessageEmbed()
			.setTitle(`**${client.user.username} settings for ${message.guild.name}**`)
			.setColor('BLUE')
			.addField('Server Settings', [
				`**❯ Prefix:** ${prefix}`,
				`**❯ Anti Links:** ${antilinks}`,
				`**❯ Muted Role:** ${mutedrole}`,
				`**❯ Verified Role:** ${verifiedrole}`,
				`**❯ Mod Log:** ${modlogs}`,
				`**❯ Server Log:** ${serverlogs}`,
				`**❯ Message Log:** ${messagelogs}`,
				'\u200b',
			])
			.addField('Welcomer', [
				`**❯ Join channel:** ${joinchnl}`,
				`**❯ Leave channel:** ${leavechnl}`,
				`**❯ Join message:** \n${joinmsg}`,
				`**❯ Leave message:** \n${leavemsg}`,
				'\u200b',
			]);

		return message.channel.send(embed);
	},
};