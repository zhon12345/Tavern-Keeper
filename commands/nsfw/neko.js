/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
	name: 'neko',
	category: 'NSFW',
	description: 'Sends images of neko, what do you expect?',
	aliases: [],
	usage: 'neko',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		else {
			superagent.get('https://nekobot.xyz/api/image')
				.query({ type: 'hneko' })
				.end((err, response) => {
					const embed = new MessageEmbed()
						.setColor('BLUE')
						.setImage(response.body.message);

					return message.channel.send(embed);
				});
		}
	},
};