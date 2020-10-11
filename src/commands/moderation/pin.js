module.exports = {
	name: 'pin',
	aliases: [],
	category: 'Moderation',
	description: 'Pin a specific messaged to the channel.',
	usage: 'pin <message>',
	run: async (bot, message, args) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `MANAGE_MESSAGES` required.',
			);
		}

		if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send(
				'<:vError:725270799124004934> Insufficient Permission! `MANAGE_MESSAGES` required.',
			);
		}

		const msg = args[0];
		if(!msg || isNaN(msg)) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide a valid message.',
			);
		}
		try {
			message.channel.messages.fetch(msg)
				.then(pinned => {
					if(!pinned.pinned) {
						pinned.pin(msg);
						message.channel.send(
							`<:vSuccess:725270799098970112> Successfully pinned ${msg}`,
						).then(message.delete());
					}
					else {
						return message.channel.send(
							'<:vError:725270799124004934> That message is not pinned.',
						);
					}
				});
		}
		catch (e) {
			return message.channel.send(
				'<:vError:725270799124004934> An error occured, please try again!',
			);
		}
	},
};