/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = {
	name: 'tentacle',
	category: 'NSFW',
	description: 'Sends images of tentacles, what do you expect?',
	aliases: [],
	usage: 'tentacle',
	run: async (client, message, args) => {
		if(!message.channel.nsfw) {
			return message.channel.send(
				'<:vError:725270799124004934> This command can only be used in a nsfw channel.',
			);
		}
		else {
			superagent.get('https://nekobot.xyz/api/image')
				.query({ type: 'tentacle' })
				.end((err, response) => {
					const embed = new MessageEmbed()
						.setColor('BLUE')
						.setImage(response.body.message);

					return message.channel.send(embed);
				});
		}
	},
};