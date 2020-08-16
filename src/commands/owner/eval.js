/* eslint-disable no-unused-vars */
const fetch = require('node-fetch');
const { MessageEmbed, Client } = require('discord.js');
const { clean } = require('../../functions');
const { BOT_OWNER } = process.env;
const client = new Client();

module.exports = {
	name: 'eval',
	category: 'Owner',
	aliases: ['ev'],
	description: 'Evaluate a specified JavaScript code.',
	usage: 'eval <code>',
	run: async (bot, message, args) => {
		const url = 'https://hasteb.in/documents';

		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			);
		}

		if(message.author.id === BOT_OWNER) {
			const embed = new MessageEmbed()
				.addField('Input', '```js\n' + args.join(' ') + '```');

			try {
				const code = args.join(' ');
				if (!code) {
					return message.channel.send(
						'<:vError:725270799124004934> Please provide a valid code.',
					);
				}
				let evaled;

				if (code.includes('SECRET') || code.includes('TOKEN') || code.includes('process.env') || code.includes('config.json')) {
					evaled = 'NO.';
				}
				else {
					evaled = eval(code);
				}

				if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0 });

				const output = clean(evaled);
				if (output.length >= 1024) {
					let response;
					try {
						response = await fetch(url, { method: 'POST', body: output, headers: { 'Content-Type': 'text/plain' } }).then(res => res.json());
					}
					catch (e) {
						console.log(e);
						return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
					}
					embed.addField('Output', `https://hasteb.in/${response.key}.js`).setColor('GREEN');
				}
				else {
					embed.addField('Output', '```js\n' + output	 + '```').setColor('GREEN');
				}

				message.channel.send(embed);

			}
			catch (error) {
				const err = clean(error);
				if (err.length >= 1024) {
					let response;
					try {
						response = await fetch(url, { method: 'POST', body: err, headers: { 'Content-Type': 'text/plain' } }).then(res => res.json());
					}
					catch (e) {
						console.log(e);
						return message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
					}
					embed.addField('Output', `https://hasteb.in/${response.key}.js`).setColor('RED');
				}
				else {
					embed.addField('Output', '```js\n' + err + '```').setColor('RED');
				}

				message.channel.send(embed);
			}
		}
	},
};