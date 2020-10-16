/* eslint-disable no-unused-vars */
module.exports = {
	name: 'nitro',
	category: 'Image',
	description: 'Ever wanted a fake nitro giveaway? Now you\'ve got one.',
	usage: 'nitro',
	run: (client, message, args) => {
		if(!message.guild.me.hasPermission('ATTACH_FILES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ATTACH_FILES` required.',
			);
		}

		message.channel.send({ files: ['./assets/image/nitro.png'] }).then(message.delete());
	},
};