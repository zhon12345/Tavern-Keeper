/* eslint-disable no-unused-vars */
const moment = require('moment');
const fetch = require('node-fetch');
const url = 'https://hasteb.in/documents';
const Guild = require('../../models/guild');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, messages) =>{
	const guildArray = [];

	messages.forEach(async (mes) =>{
		if(mes.partial) await mes.fetch();
		guildArray.push(mes.guild);
	});

	const guild = guildArray[0];
	const settings = await Guild.findOne({
		guildID: guild.id,
	});
	const logs = settings.settings.messagelog;
	const logsChannel = client.channels.cache.get(logs);
	if(!logsChannel) return;

	const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

	let response;
	try {
		response = await fetch(url, { method: 'POST', body: output, headers: { 'Content-Type': 'text/plain' } }).then(res => res.json());
	}
	catch (e) {
		return logsChannel.channel.send('<:vError:725270799124004934> An error occured, please try again!');
	}
	const embed = new MessageEmbed()
		.setDescription([`
            [\`📄 View\`](${output.length > 0 ? 'https://hasteb.in/' + response.key + '.js' : output})
           `])
		.setColor('RED');
	await logsChannel.send(
		`\`[${moment(Date.now()).format('HH:mm:ss')}]\` 🗑️ **${messages.first().author.username}**#${messages.first().author.discriminator} cleared \`${messages.size - 1}\` messages in ${messages.first().channel}`,
		embed,
	);

};