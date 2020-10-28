const { MessageEmbed } = require("discord.js");
const { delay } = require("../../functions");
const { BOT_OWNER } = process.env;

module.exports = {
	name: "hack",
	usage: "hack",
	description: "*Fake* Hacks a user",
	aliases: [],
	category:"Fun",
	run: async (bot, message, args) => {
		try {
			const ending = ["@gmail.com", "@hotmail.com", "@yahoo.com", "@yourmom.gov"];
			const genending = ending[Math.floor(Math.random() * ending.length)];

			const passwords = ["`lickmy*****`", "`pe***`", "`ilike****`", "`co**lover`", "`hairy*****`"];
			const genpass = passwords[Math.floor(Math.random() * passwords.length)];

			const dms = ["It looks small", "Her dad walked in on us", "I have no dad man", "Her dog smells weird", "I lost my job", "My dad is gay", "Im adopted"];
			const possible = dms[Math.floor(Math.random() * dms.length)];

			const words = ["micro pp", "i'm adopted", "minecraft bad", "i'm bald"];
			const dodo = words[Math.floor(Math.random() * words.length)];

			const IP = ["205.71.201.62", "217.14.22.182", "174.229.194.82", "49.197.197.60", "154.2345.24.743", "255.255.255.0", "356.653.56", "101.12.8.6053", "87.231.45.33", "91.55.43.8"];
			const jj = IP[Math.floor(Math.random() * IP.length)];

			const hacked = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0]);
			if(!hacked) {
				return message.channel.send(
					"<:vError:725270799124004934> Please provide a valid user.",
				);
			}
			else if(hacked.id === BOT_OWNER) {
				return message.channel.send(
					"<:vError:725270799124004934> An error occured, please try again!",
				);
			}
			await message.channel.send(`Hacking ${hacked.user.username} now...`).then(async msg => {
				await delay(1500);
				await msg.edit("[▖] Fiding discord login... (2fa bypassed)");
				await delay(2000);
				await msg.edit(`[▘] Found:\n**Email:** \`${hacked.user.username.split(" ").join("").toLowerCase()}${genending}\`\n**Password:** ${genpass}`);
				await delay(2500);
				await msg.edit("[▝] Fetching DM's with closest friends (They have no friends)");
				await delay(2000);
				await msg.edit(`[▗] **Last DM:** "${possible}" `);
				await delay(1555);
				await msg.edit("[▖] Fetching most common phrase");
				await delay(1700);
				await msg.edit(`[▘] **Most common phrase:** "${dodo}"`);
				await delay(2000);
				await msg.edit(`[▝] Injecting pepe virus into discriminator \`#${hacked.user.discriminator}\``);
				await delay(1000);
				await msg.edit("[▗] Virus injected");
				await delay(1000);
				await msg.edit("[▖] Finding IP");
				await delay(2500);
				await msg.edit(`[▘] **IP:** ${jj}`);
				await delay(1000);
				await msg.edit("[▝] Spamming email...");
				await delay(1400);
				await msg.edit("[▗] Reporting user for breaking Discord ToS...");
				await delay(1400);
				await msg.edit("[▖] Selling all data to the government...");
				await delay(1400);
				const embed = new MessageEmbed()
					.setTitle(`${hacked.user.username}'s Information`)
					.setDescription(`Email: \`${hacked.user.username.split(" ").join("").toLowerCase()}${genending}\`\nPassword: \`${genpass}\`\nIP: \`${jj}\``)
					.setColor("BLUE");
				await msg.edit(`<:vSuccess:725270799098970112> Successfully hacked ${hacked.user.username}`, embed);
			});
		}
		catch(err) {
			message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
		}
	},
};