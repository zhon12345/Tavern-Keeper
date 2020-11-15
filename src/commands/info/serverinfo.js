const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Roles',
	ALL_MEMBERS: 'Everyone',
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
};

const regions = {
	brazil: ':flag_br: `Brazil`',
	europe: ':flag_eu: `Europe`',
	hongkong: ':flag_hk: `Hong Kong`',
	india: ':flag_in: `India`',
	japan: ':flag_jp: `Japan`',
	russia: ':flag_ru: `Russia`',
	singapore: ':flag_sg: `Singapore`',
	southafrica: ':flag_za: `South Africa`',
	sydney: ':flag_au: `Sydeny`',
	'us-central': ':flag_us: `US Central`',
	'us-east': ':flag_us: `US East`',
	'us-west': ':flag_us: `US West`',
	'us-south': ':flag_us: `US South`',
	'eu-west': ':flag_eu: `EU West`',
};

module.exports = {
	name: 'serverinfo',
	category: 'Info',
	description: 'Displays information about the server.',
	aliases: ['server', 'guild', 'guildinfo', 'si', 'gi'],
	usage: 'serverinfo',
	userperms: [],
	botperms: ['USE_EXTERNAL_EMOJIS'],
	run: async (client, message, args) => {
		const guild = client.guilds.cache.get(args[0]) || message.guild;
		const members = guild.members.cache;
		const channels = guild.channels.cache;
		const emojis = guild.emojis.cache;

		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.setTitle('Guild Information')
			.addField('<:documents:773950876347793449> General ❯', [
				`> **<:card:773965449402646549> Guild Name: \`${guild.name}\`**`,
				`> **\\📇 Guild ID: \`${guild.id}\`**`,
				`> **\\👦 Guild Icon: ${guild.iconURL() ? `[\`Click here!\`](${guild.iconURL({ size: 256, dynamic: true })})` : '`None`'}**`,
				`> **\\👑 Guild Owner: ${guild.owner}**`,
				`> **\\🌐 Region: ${regions[guild.region]}**`,
				`> **\\🤬 Explicit Filter: \`${filterLevels[message.guild.explicitContentFilter]}\`**`,
				`> **\\✅ Verification Level: \`${verificationLevels[guild.verificationLevel]}\`**`,
				`> **\\📅 Created: \`${moment(guild.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')}\` | \`${Math.floor((Date.now() - guild.createdTimestamp) / 86400000)}\` day(s) ago**`,
				'\u200b',
			])
			.addField('<:documents:773950876347793449> Statistics ❯', [
				`> **\\🏆 Role Count: \`${message.guild.roles.cache.map(role => role.toString()).length}\` Roles**`,
				`> **\\👥 Member Count: \`${members.filter(member => !member.user.bot).size}\` Users \`${members.filter(member => member.user.bot).size}\` Bots**`,
				`> **\\💬 Channel Count: \`${channels.filter(channel => channel.type === 'text').size}\` Text \`${channels.filter(channel => channel.type === 'voice').size}\` Voice**`,
				`> **<:emojis:774070456059822090> Emoji Count: \`${emojis.filter(emoji => !emoji.animated).size}\` Regular \`${emojis.filter(emoji => emoji.animated).size}\` Animated**`,
				`> **<:tier:774071372942147594> Guild Boost Tier: \`Tier ${guild.premiumTier}\`**`,
				`> **<:boost:774071372644483082> Guild Boost Count: \`${guild.premiumSubscriptionCount}\` Boost(s)**`,
				'\u200b',
			])
			.addField('<:documents:773950876347793449> Presence ❯', [
				`> **<:online:745651877382717560> Online: \`${members.filter(member => member.presence.status === 'online').size}\`**`,
				`> **<:idle:773964101390958632> Idle: \`${members.filter(member => member.presence.status === 'idle').size}\`**`,
				`> **<:dnd:773964313630998538> Do Not Disturb: \`${members.filter(member => member.presence.status === 'dnd').size}\`**`,
				`> **<:offline:745651876552376402> Offline: \`${members.filter(member => member.presence.status === 'offline').size}\`**`,
			])
			.setFooter(`Requested by ${message.author.tag} `)
			.setTimestamp();

		message.channel.send(embed);
	},
};