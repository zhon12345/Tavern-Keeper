const { Type } = require('@extreme_hero/deeptype');
const { MessageEmbed } = require('discord.js');
const { clean } = require('../../functions');
const sourcebin = require('sourcebin_js');
const { inspect } = require('util');

module.exports = {
	name: 'eval',
	category: 'Owner',
	aliases: ['ev'],
	description: 'Evaluate a specified JavaScript code.',
	usage: 'eval <code>',
	userperms: ['BOT_OWNER'],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const code = args.join(' ').replace(/[“”]/g, '"').replace(/[‘’]/g, '\'');
		if (!args.length) {
			return message.channel.send(
				'`❌` Please provide valid code.',
			);
		}

		const words = ['token', 'process.env', 'bot_token'];
		for(const word of words) {
			if (code.replace('\\', '').toLowerCase().includes(word)) {
				const embed = new MessageEmbed()
					.setTitle('Error!')
					.setColor('RED')
					.addField('Input', `\`\`\`js\n${code}\`\`\``)
					.addField('Output', '```Nice try buddy! What you gonna do with it?```');
				return message.channel.send(embed);
			}
		}

		try {
			const start = process.hrtime();
			let evaled = eval(code);
			if(evaled instanceof Promise) {
				evaled = await evaled;
			}
			const stop = process.hrtime(start);
			const output = clean(inspect(evaled, { depth: 0 }));
			if(output.length > 1024) {
				let response;
				try {
					response = await sourcebin.create([
						{
							name: ' ',
							content: output,
							languageId: 'text',
						},
					], {
						title: 'Eval results',
						description: ' ',
					});
				}
				catch (e) {
					return message.channel.send('`❌` An error occurred, please try again!');
				}

				const embed = new MessageEmbed()
					.setTitle('Success!')
					.setColor('GREEN')
					.setFooter(`Type: ${new Type(evaled).is} | Time Taken: ${(((stop[0] * 1e9) + stop[1]) / 1e6)}ms`)
					.addField('Input', `\`\`\`js\n${code}\`\`\``)
					.addField('Output', `\`\`\`\n${response.url}\n\`\`\``);
				await message.channel.send(embed);
			}
			else {
				const embed = new MessageEmbed()
					.setTitle('Success!')
					.setColor('GREEN')
					.setFooter(`Type: ${new Type(evaled).is} | Time Taken: ${(((stop[0] * 1e9) + stop[1]) / 1e6)}ms`)
					.addField('Input', `\`\`\`js\n${code}\`\`\``)
					.addField('Output', `\`\`\`js\n${output}\n\`\`\``);
				await message.channel.send(embed);
			}
		}
		catch (err) {
			if(err.length > 1024) {
				let response;
				try {
					response = await sourcebin.create([
						{
							name: ' ',
							content: err,
							languageId: 'text',
						},
					], {
						title: 'Error',
						description: ' ',
					});
				}
				catch (e) {
					return message.channel.send('`❌` An error occurred, please try again!');
				}

				const embed = new MessageEmbed()
					.setTitle('Success!')
					.setColor('GREEN')
					.addField('Input', `\`\`\`js\n${code}\`\`\``)
					.addField('Output', `\`\`\`\n${response.url}\n\`\`\``);
				await message.channel.send(embed);
			}
			else {
				const embed = new MessageEmbed()
					.setTitle('Error!')
					.setColor('RED')
					.addField('Input', `\`\`\`js\n${code}\`\`\``)
					.addField('Output', `\`\`\`xl\n${clean(err)}\n\`\`\``);
				await message.channel.send(embed);
			}
		}
	},
};