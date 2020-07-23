/* eslint-disable no-unused-vars */
const { VultrexHaste } = require('vultrex.haste');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const haste = new VultrexHaste({ url: 'https://hastebin.com' });
const { MessageEmbed } = require('discord.js');

module.exports = async (client, messages) =>{
	const guildArray = [];
	const channelArray = [];
	messages.forEach(async (mes) =>{
		if(mes.partial) await mes.fetch();
		guildArray.push(mes.guild);
		channelArray.push(mes.channel);
	});
	const guild = guildArray[0];
	const logsChannels = db.fetch(`modlog_${guild.id}`);
	const logsChannel = client.channels.cache.get(logsChannels);
	if(!logsChannel || logsChannel === null) {return;}
	else{
		const output = messages.map((m, index) => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.content}`).join('\n');

		const embed = new MessageEmbed()
			.setDescription(stripIndents`
            [\`📄 View\`](${output.length > 0 ? await haste.post(`${output}`) : output})
           `)
			.setColor('RED');
		await logsChannel.send(embed);
	}
};