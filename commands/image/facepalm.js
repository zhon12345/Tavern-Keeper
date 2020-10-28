/* eslint-disable no-unused-vars */
module.exports = {
	name: 'facepalm',
	category: 'Image',
	description: 'I have no comments...',
	aliases: [],
	usage: 'facepalm',
	run: (client, message, args) => {
		if(!message.guild.me.hasPermission('ATTACH_FILES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `ATTACH_FILES` required.',
			);
		}

		message.channel.send({ files: ['./assets/image/facepalm.gif'] });
	},
};