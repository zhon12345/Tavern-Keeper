const sourcebin = require('sourcebin_js');

module.exports = {
	name: 'hastebin',
	category: 'Misc',
	description: 'Upload specified text to sourcebin.',
	aliases: ['pastebin', 'bin'],
	usage: 'hastebin <text>',
	disabled: false,
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'`❌` Please provide valid text',
			);
		}

		let response;
		try {
			response = await sourcebin.create([
				{
					name: ' ',
					content: text,
					languageId: 'text',
				},
			], {
				title: `${message.author.tag}'s sourcebin`,
				description: ' ',
			});
		}
		catch (e) {
			return message.channel.send('`❌` An error occurred, please try again!');
		}

		message.channel.send(`${response.url}`);
	},
};