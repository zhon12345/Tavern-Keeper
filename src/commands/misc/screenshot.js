/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { isURL } = require('../../functions');
const fetch = require('node-fetch');

module.exports = {
	name: 'screenshot',
	category: 'Misc',
	description: 'Get a screenshot of a website you provided. (NSFW Channel required)',
	aliases: [],
	usage: 'quotes',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		const site = args[0];
		if(!site || !isURL(site)) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid website URL (eg. `https://google.com`)',
			);
		}
		const url = `http://image.thum.io/get/${site}`;

		try {
			const { body } = await fetch(url);
			message.channel.send('⏳ Fetching...').then(msg => {
				msg.delete();
				message.channel.send({ files: [{ attachment: body, name: 'screenshot.png' }] });
			});
		}
		catch (e) {
			console.log(e);
			return message.channel.send(
				'<:vError:725270799124004934> An error occurred, please try again!',
			);
		}
	},
};