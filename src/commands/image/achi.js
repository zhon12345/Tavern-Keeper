const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'achi',
	category: 'Image',
	description: 'Get a personalised minecraft achievement.',
	aliases: ['achivement'],
	usage: 'achi <text>',
	run: (client, message, args) => {

		const tips = [
			'Dont forget milk good for you!',
			'2.2 when?',
			'There is a lot of random \'tips\' on this cmd.',
			'Keep your diamond it\'s usefull!',
			'Minecraft or geometry dash?',
			'Easy to make right?',
			':)',
			' You can make whatever you want with the achivement command.' ];

		const tip = tips[Math.floor(Math.random() * tips.length)];


		const min = 1;
		const max = 39;

		const logo = Math.floor(Math.random() * (+max - +min)) + +min;

		const achi = args.slice().join('+');
		if(!achi) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}
		if (achi.length >= 24) {
			return message.channel.send(
				'<:vWarning:725276167346585681> You have exceeded the character limit.',
			);
		}
		const image = (`https://minecraftskinstealer.com/achievement/${logo}/Achievement+Get%21/${achi}`);
		const attachment = new MessageAttachment(image, 'achivement.png');
		message.channel.send(tip, attachment);
	},
};