/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const prefix = process.env.BOT_PREFIX;

module.exports = {
	name: 'tos',
	category: 'Info',
	description: 'Shows the terms of service of the bot.',
	aliases: ['termsofservice'],
	usage: 'tos',
	run: async (client, message, args) => {
		const pEmbed = new MessageEmbed()
			.setThumbnail('https://www.symphonyenvironmental.com/wp-content/uploads/2019/10/Terms-and-conditions-icon-V2.png')
			.setTitle('**Terms of Service**')
			.setColor('BLUE')
			.setDescription([`
            By using ${client.user.username}, you **agree** to abide by the terms of service. This bot has zero relation with Discord, it's only the service that it's used on.

            **Bot Spam and Misuse**
            • _Content:_ 
            Everything posted by the bot falls under your responsibility, not the bot or developer. If the bot posts something "questionable" it's because of the input you gave it. I do make an effort to filter such content, but it's impossible to filter everything on the internet.
            
            • _API Spam:_ 
            Don't use this bot to spam Discord's API or any API it uses.
            
            • _Abusing Bugs:_ 
            This bot is a beta version, and there could be bugs that crash the bot. Please report these bugs [here](https://github.com/zhon12345/Tavern_Keeper/issues/new) or use the \`${prefix}report\` command.
            
            **Punishment**
            Violating the TOS could result in you or your entire guild getting blacklisted (blocked from using any commands and blocked from adding the bot to a server).

            **Appeal**
            There is no method of appealing yet, because I don't think it's necessary.
        `]);
		message.channel.send(pEmbed);
	},
};