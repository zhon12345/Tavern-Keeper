/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const Guild = require('../../models/guild');
const { stripIndents } = require('common-tags');
const url = 'https://hasteb.in/documents';
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
	const settings = await Guild.findOne({
		guildID: guild.id,
	});
	const logs = settings.settings.modlog;
	const logsChannel = client.channels.cache.get(logs);
	if(!logsChannel) {return;}
	else{
		const output = messages.map((m, index) => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.content}`).join('\n');

		let response;
		try {
			response = await fetch(url, { method: 'POST', body: output, headers: { 'Content-Type': 'text/plain' } }).then(res => res.json());
		}
		catch (e) {
			console.log(e);
			return logsChannel.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}
		const embed = new MessageEmbed()
			.setDescription(stripIndents`
            [\`📄 View\`](${output.length > 0 ? 'https://hasteb.in/' + response.key + '.js' : output})
           `)
			.setColor('RED');
		await logsChannel.send(embed);
	}
};