/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
	name: 'porngif',
	category: 'NSFW',
	description: 'Sends images of porn gifs, what do you expect?',
	aliases: ['pgif'],
	usage: 'porngif',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		else {
			superagent.get('https://nekobot.xyz/api/image')
				.query({ type: 'pgif' })
				.end((err, response) => {
					const embed = new MessageEmbed()
						.setColor('BLUE')
						.setImage(response.body.message);

					return message.channel.send(embed);
				});
		}
	},
};