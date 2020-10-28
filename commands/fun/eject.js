/* eslint-disable no-irregular-whitespace */
module.exports = {
	name: "eject",
	category: "Fun",
	description: "Are they a imposter? They seem kinda sus.",
	aliases: [],
	usage: "eject <user>",
	run: async (client, message, args) => {
		const isimpostor = Math.floor(Math.random() * 2) + 1;
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
		if(!member) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid user.",
			);
		}

		if (isimpostor === 1) {
			message.channel.send([`
			. 　　　。　　　　•　 　ﾟ　　。 　　.
			　　　.　　　 　　.　　　　　。　　 。　. 　
			.　　 。　　　　　 <:ejected:762598357268824098> 。 . 　　 • 　　　　•
			ﾟ　　 ${member.user.username} was not An Impostor.　 。　.
				'　　　 2 Impostor remains 　 　　。
			ﾟ　　　.　　　. ,　　　　.　 .
			`]);
		}
		else if (isimpostor === 2) {
			message.channel.send([`
			. 　　　。　　　　•　 　ﾟ　　。 　　.
			　　　.　　　 　　.　　　　　。　　 。　. 　
			.　　 。　　　　　 <:ejected:762598357268824098> 。 . 　　 • 　　　　•
			ﾟ　　 ${member.user.username} was An Impostor.　 。　.
				'　　　 1 Impostor remains 　 　　。
			ﾟ　　　.　　　. ,　　　　.　 .
			`]);
		}

	},
};