/* eslint-disable no-useless-escape */
const { VultrexHaste } = require('vultrex.haste');
const { MessageEmbed } = require('discord.js');
const { clean } = require('../../functions');
const haste = new VultrexHaste({ url: 'https://hasteb.in' });
const { BOT_OWNER } = process.env;

module.exports = {
	name: 'eval',
	category: 'Owner',
	aliases: ['ev'],
	description: 'Evaluate a specified JavaScript code.',
	usage: '[p]eval <code>',
	run: async (bot, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		if(message.author.id === BOT_OWNER) {
			const embed = new MessageEmbed()
				.addField('Input', '```js\n' + args.join(' ') + '```');

			try {
				const code = args.join(' ');
				if (!code) {
					return message.channel.send(
						'<:vError:725270799124004934> Please provide a valid code.',
					).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
				}
				let evaled;

				if (code.includes('SECRET') || code.includes('TOKEN') || code.includes('process.env')) {
					evaled = 'No, shut up, what will you do it with the token?';
				}
				else {
					evaled = eval(code);
				}

				if (typeof evaled !== 'string') evaled = require('util').inspect(evaled, { depth: 0 });

				const output = clean(evaled);
				if (output.length >= 1024) {
					const { body } = await haste.post(output);
					embed.addField('Output', `https://hastebin.com/${body.key}.js`).setColor('GREEN');
				}
				else {
					embed.addField('Output', '```js\n' + output + '```').setColor('GREEN');
				}

				message.channel.send(embed);

			}
			catch (error) {
				const err = clean(error);
				if (err.length >= 1024) {
					const { body } = await haste.post(err);
					embed.addField('Output', `https://hastebin.com/${body.key}.js`).setColor('RED');
				}
				else {
					embed.addField('Output', '```js\n' + err + '```').setColor('RED');
				}

				message.channel.send(embed);
			}
		}
	},
};