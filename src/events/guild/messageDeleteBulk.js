const moment = require('moment');
const sourcebin = require('sourcebin_js');
const Guild = require('../../models/guild');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, messages) => {
	const guildArray = [];

	messages.forEach(async (mes) => {
		if(mes.partial) await mes.fetch();
		guildArray.push(mes.guild);
	});

	const guild = guildArray[0];
	const settings = await Guild.findOne({
		guildID: guild.id,
	});

	const logsChannel = client.channels.cache.get(settings.settings.messagelog);
	if(!logsChannel) return;

	const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

	let response;
	try {
		response = await sourcebin.create([
			{
				name: ' ',
				content: output,
				languageId: 'text',
			},
		], {
			title: `Deleted messages in ${messages.first().channel.name}`,
			description: ' ',
		});
	}
	catch (e) {
		return logsChannel.channel.send('<:vError:725270799124004934> An error occurred, please try again!');
	}

	const embed = new MessageEmbed()
		.setDescription(`[\`📄 View\`](${output.length > 0 ? `${response.url}` : output})`)
		.setColor('RED');

	await logsChannel.send(
		`\`[${moment(Date.now()).format('HH:mm:ss')}]\` 🗑️ **${messages.first().author.username}**#${messages.first().author.discriminator} cleared \`${messages.size - 1}\` messages in ${messages.first().channel}`,
		embed,
	);
};