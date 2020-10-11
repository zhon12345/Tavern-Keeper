/* eslint-disable no-unused-vars */
module.exports = {
	name: 'fly',
	category: 'Animals',
	description: 'Sends a fake image of a fly that looks suspiciously real.',
	aliases: [],
	usage: 'fly',
	run: (client, message, args) => {
		if(!message.guild.me.hasPermission('ATTACH_FILES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ATTACH_FILES` required.',
			);
		}

		message.channel.send({ files: ['./assets/image/fly.png'] }).then(message.delete());
	},
};