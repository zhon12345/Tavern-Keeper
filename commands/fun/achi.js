module.exports = {
	name: 'achi',
	category: 'Fun',
	description: 'make your own achivement',
	aliases: [],
	usage: 'achi <text>',
	run: (client, message, args) => {
		const { MessageEmbed } = require('discord.js');

		const logos = [
			' 1',
			'2',
			' 2',
			'3',
			' 4',
			'5',
			' 6',
			'7',
			' 8',
			'9',
			' 10',
		];


		const logo = logos[Math.floor(Math.random() * logos.length)];


		const achi = args.slice().join('+');
		if(!achi) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		if (achi.length >= 24) {
			return message.channel.send(
				'<:vError:725270799124004934> You have exceeded the 25 characters limit.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}
		const image = (`https://minecraftskinstealer.com/achievement/${logo}/Achievement+Get%21/${achi}`);
		const achiem = new MessageEmbed()
			.setColor('36393F')
			.setImage(image);
		message.channel.send(achiem);
		message.delete();


	},

};