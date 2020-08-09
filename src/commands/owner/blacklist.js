const { BOT_OWNER } = process.env;
const Blacklist = require('../../models/blacklist');
const mongoose = require('mongoose');

module.exports = {
	name: 'blacklist',
	category: 'Owner',
	description: 'Blacklist/Unblacklist a specified guild.',
	aliases: [],
	usage: 'blacklist [add/remove] [guild]',
	guildOnly: true,
	run: async (client, message, args) => {
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
			else {
				guild = args[1];
			}
		}
		if (args[0] === 'add') {
			Blacklist.findOne(
				{ guildID: guild },
				(err, blist) => {
					if (err) console.error(err);
					if (!blist) {
						const newList = new Blacklist({
							_id: mongoose.Types.ObjectId(),
							guildID: guild,
							guildName: client.guilds.cache.get(guild).name,
						});

						newList.save();
						client.guilds.cache.get(guild).leave();
						message.channel.send(
							`<:vSuccess:725270799098970112> Sucessfully added ${client.guilds.cache.get(guild)} to blacklist.`,
						);
					}
					else {
						return message.channel.send(
							'<:vError:725270799124004934> The specified guild is already blacklisted.',
						);
					}
				});
		}
		else if (args[0] === 'remove') {
			Blacklist.findOneAndDelete(
				{ guildID: guild },
				(err, blist) => {
					if (err) console.error(err);
					if (!blist) {
						return message.channel.send(
							'<:vError:725270799124004934> The specified guild is not blacklisted.',
						);
					}
					else {
						message.channel.send(
							`<:vSuccess:725270799098970112> Sucessfully removed ${blist.guildName} from blacklist.`,
						);
					}
				});
		}
	},
};