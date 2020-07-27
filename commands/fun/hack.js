const { sleep } = require('../../functions');

module.exports = {
	name: 'hack',
	aliases: [],
	usage: 'hack',
	description: '*Fake* Hacks a user',
	category:'Fun',
	run: async (bot, message, args) => {
		try {
			const emails = ['loves******', 'playsminecraft', 'hasnofriends', 'isgay', 'eatsdogs', 'hassmallpepe'];
			const genemail = emails[Math.floor(Math.random() * emails.length)];
			const ending = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@yourmom.gov'];
			const genending = ending[Math.floor(Math.random() * ending.length)];
			const passwords = ['`lickmy*****`', '`pe***`', '`ilike***`', '`co**lover`', '`hairy*****`'];
			const genpass = passwords[Math.floor(Math.random() * passwords.length)];

			const dms = ['It looks small', 'Her dad walked in on us', 'I have no dad man', 'Her dog smells weird', 'I lost my job', 'My dad is gay', 'Im adopted'];
			const possible = dms[Math.floor(Math.random() * dms.length)];

			const words = ['micro', 'tiny', 'men', 'adopted', 'alabama', 'minecraft', 'bald'];
			const dodo = words[Math.floor(Math.random() * words.length)];

			const IP = ['205.71.201.62', '217.14.22.182', '174.229.194.82', '49.197.197.60'];
			const jj = IP[Math.floor(Math.random() * IP.length)];

			const hacked = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

			if(!hacked) {return message.channel.send('<:vError:725270799124004934> Please provide a valid user.');}

			await message.channel.send(`Hacking ${hacked.user.username} now...`).then(async msg => {
				await sleep(1500);
				await msg.edit('[▖] Fiding discord login... (2fa bypassed)');
				await sleep(2000);
				await msg.edit(`[▘] Found:\n**Email:** \`${hacked.user.username}${genemail}${genending}\`\n**Password:** ${genpass}`);
				await sleep(2500);
				await msg.edit('[▝] Fetching DM\'s with closest friends (They have no friends)');
				await sleep(2000);
				await msg.edit(`[▗] **Last DM:** "${possible}" `);
				await sleep(1555);
				await msg.edit('[▖] Fetching most common word');
				await sleep(1700);
				await msg.edit(`[▘] **Most common word:** "${dodo}"`);
				await sleep(2000);
				await msg.edit('[▝] Hacking fortnite account...');
				await sleep(1000);
				await msg.edit('[▗] Hacking fortnite account... (this game sucks)');
				await sleep(1700);
				await msg.edit('[▖] *succesfully* stole all their vbucks');
				await sleep(1000);
				await msg.edit(`[▘] Injecting pepe virus into discriminator \`#${hacked.user.discriminator}\``);
				await sleep(1000);
				await msg.edit('[▝] Virus injected');
				await sleep(1000);
				await msg.edit('[▗] Finding IP');
				await sleep(2500);
				await msg.edit(`[▖] **IP:** ${jj}`);
				await sleep(1000);
				await msg.edit('[▘] Spamming email...');
				await sleep(1400);
				await msg.edit('[▝] Reporting user for breaking Discord ToS...');
				await sleep(1400);
				await msg.edit('[▗] Selling all data to the government...');
				await sleep(1400);
				await msg.edit(`Finished hacking ${hacked.user.username}`);
			});
			setTimeout(() => {
				message.channel.send('The *totally* real hack is complete');
			}, 1000);
		}
		catch(err) {
			message.channel.send('<:vError:725270799124004934> An error occured, please try again!');
			console.log(err);
		}
	},
};