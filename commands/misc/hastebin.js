const fetch = require('node-fetch');

module.exports = {
	name: 'hastebin',
	category: 'Misc',
	description: 'Upload specified text to hastebin.',
	aliases: ['pastebin', 'bin'],
	usage: 'hastebin <text>',
	run: async (client, message, args) => {
		const text = args.slice().join(' ');
		if (!text) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text',
			);
		}

		const url = 'https://hasteb.in/documents';

		let response;
		try {
			response = await fetch(url, { method: 'POST', body: text, headers: { 'Content-Type': 'text/plain' } }).then(res => res.json());
		}
		catch (e) {
			return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
		}

		message.channel.send(`https://hasteb.in/${response.key}.js`);
	},
};