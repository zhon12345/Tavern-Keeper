const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { BOT_OWNER } = process.env;

module.exports = {
	name: 'blacklist',
	category: 'Owner',
	description: 'Blacklist/Unblacklist a specified guild.',
	aliases: [],
	usage: 'blacklist [add/remove] [guild]',
	guildOnly: true,
	run: (client, message, args) => {
		if(message.author.id !== BOT_OWNER) {
			return message.channel.send(
				'<:vError:725270799124004934> You must have the following permissions to use that: Bot Owner.',
			);
		}

		let guild;
		if (args[0]) {
			if(isNaN(args[1])) {
				return message.channel.send(
					'<:vError:725270799124004934> Please provide a valid guild id.',
				);
			}
			else {guild = args[1];}
		}


		if (args[0] === 'add') {
			if (db.has('blacklist', guild)) {
				return message.channel.send(
					'<:vError:725270799124004934> The specified guild is already blacklisted.',
				).then(message.delete());
			}
			else {
				db.push('blacklist', guild);
				message.channel.send(
					`<:vSuccess:725270799098970112> Sucessfully added ${guild} to blacklist.`,
				).then(() => client.guilds.cache.get(guild).leave()).then(message.delete());
			}
		}
		else if (args[0] === 'remove') {
			if (!db.has('blacklist', guild)) {
				return message.channel.send(
					'<:vError:725270799124004934> The specified guild is not blacklisted.',
				).then(message.delete());
			}
			else {
				db.delete('blacklist', guild);
				message.channel.send(
					`<:vSuccess:725270799098970112> Sucessfully removed ${guild} from blacklist.`,
				).then(message.delete());
			}
		}
		else {
			const blacklist = db.get('blacklist');
			const embed = new MessageEmbed()
				.setTitle('Blacklisted guilds')
				.setDescription(blacklist ? blacklist : 'None')
				.setColor('BLUE');
			return message.channel.send(embed);
		}
	},
};