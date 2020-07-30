/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

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
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		let prefix;
		const prefixes = db.get(`prefix_${message.guild.id}`);
		if(prefixes == null) {
			prefix = process.env.BOT_PREFIX;
		}
		else {
			prefix = prefixes;
		}

		let mutedrole;
		const muterole = db.get(`muterole_${message.guild.id}`);
		const mrole = `<@&${muterole}>`;
		if(muterole == null) {
			mutedrole = 'None';
		}
		else {
			mutedrole = mrole;
		}

		let verifiedrole;
		const verifyrole = db.get(`verifiedrole_${message.guild.id}`);
		const vrole = `<@&${verifyrole}>`;
		if(verifyrole == null) {
			verifiedrole = 'None';
		}
		else {
			verifiedrole = vrole;
		}

		let reports;
		const report = db.get(`reports_${message.guild.id}`);
		const rport = `<#${report}>`;
		if(report === null) {
			reports = 'None';
		}
		else {
			reports = rport;
		}

		let modlogs;
		const modlog = db.get(`modlog_${message.guild.id}`);
		const mlog = `<#${modlog}>`;
		if(modlog == null) {
			modlogs = 'None';
		}
		else {
			modlogs = mlog;
		}

		let serverlogs;
		const serverlog = db.get(`serverlog_${message.guild.id}`);
		const slog = `<#${serverlog}>`;
		if(serverlog == null) {
			serverlogs = 'None';
		}
		else {
			serverlogs = slog;
		}

		let messagelogs;
		const messagelog = db.get(`messagelog_${message.guild.id}`);
		const msglog = `<#${messagelog}>`;
		if(messagelog == null) {
			messagelogs = 'None';
		}
		else {
			messagelogs = msglog;
		}

		let joinchnl;
		const joinchannel = db.get(`joinchannel_${message.guild.id}`);
		const jchannel = `<#${joinchannel}>`;
		if(joinchannel == null) {
			joinchnl = 'None';
		}
		else {
			joinchnl = jchannel;
		}

		let leavechnl;
		const leavechannel = db.get(`leavechannel_${message.guild.id}`);
		const lchannel = `<#${leavechannel}>`;
		if(leavechannel == null) {
			leavechnl = 'None';
		}
		else {
			leavechnl = lchannel;
		}

		let joinmsg;
		const joinmessage = db.get(`jointext_${message.guild.id}`);
		if(joinmessage == null) {
			joinmsg = 'None';
		}
		else {
			joinmsg = joinmessage;
		}

		let leavemsg;
		const leavemessage = db.get(`leavetext_${message.guild.id}`);
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
				`**❯ Muted Role:** ${mutedrole}`,
				`**❯ Verified Role:** ${verifiedrole}`,
				`**❯ Reports:** ${reports}`,
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