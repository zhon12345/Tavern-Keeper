/* eslint-disable no-irregular-whitespace */
module.exports = {
	name: 'imposter',
	category: 'Fun',
	description: 'Are they a imposter? They seem kinda sus.',
	aliases: [],
	usage: 'imposter <user>',
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid user.',
			);
		}

		message.channel.send([`
        . 　　　。　　　　•　 　ﾟ　　。 　　.
        　　　.　　　 　　.　　　　　。　　 。　. 　
        .　　 。　　　　　 <:ejected:762598357268824098> 。 . 　　 • 　　　　•
        ﾟ　　 ${member.user.username} was An Impostor.　 。　.
            '　　　 1 Impostor remains 　 　　。
        ﾟ　　　.　　　. ,　　　　.　 .
        `]);
	},
};