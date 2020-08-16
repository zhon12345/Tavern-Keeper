module.exports = {
	name: 'clapify',
	category: 'Fun',
	description: 'Generate clapified 👏 text 👏',
	aliases: [],
	usage: 'clapify <text>',
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			);
		}

		let text;
		const txt = args.join(' ');
		if(/\s/.test(txt)) {
			text = args.join(' 👏 ');
		}
		else {
			text = args.join(' ').split('').join(' 👏 ');
		}
		message.channel.send(`${text} 👏`);
	},
};