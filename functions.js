module.exports = {
	// love.js
	getMember: function(message, toFind = "") {
		toFind = toFind.toLowerCase();

		let target = message.guild.members.cache.get(toFind);

		if (!target && message.mentions.members) {target = message.mentions.members.first();}

		if (!target && toFind) {
			target = message.guild.members.find(member => {
				return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind);
			});
		}

		if (!target) {target = message.member;}

		return target;
	},

	// rps.js
	getResult: function(me, clientChosen) {
		if ((me === "🗻" && clientChosen === "✂") ||
			(me === "📰" && clientChosen === "🗻") ||
			(me === "✂" && clientChosen === "📰")) {
			return "You won!";
		}
		else if (me === clientChosen) {
			return "It's a tie!";
		}
		else {
			return "You lost!";
		}
	},

	// botinfo.js
	formatBytes: function(a, b) {
		if (a === 0) {
			return "0 Bytes";
		}
		const c = 1024,
			d = b || 2,
			e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
			f = Math.floor(Math.log(a) / Math.log(c));

		return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
	},

	// uptime.js, botinfo.js & channelinfo.js
	parseDur: function(ms) {
		let seconds = ms / 1000;

		const days = parseInt(seconds / 86400);
		seconds = seconds % 86400;

		const hours = parseInt(seconds / 3600);
		seconds = seconds % 3600;

		const minutes = parseInt(seconds / 60);
		seconds = parseInt(seconds % 60);

		if (days) {
			return `\`${days}\` day, \`${hours}\` hours, \`${minutes}\` minutes`;
		}
		else if (hours) {
			return `\`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`;
		}
		else if (minutes) {
			return `\`${minutes}\` minutes, \`${seconds}\` seconds`;
		}
		return `\`${seconds}\` second(s)`;
	},

	// aliases.js
	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	// memercount.js
	checkBots: function(guild) {
		let botCount = 0;
		guild.members.cache.forEach(member => {
			if (member.user.bot) botCount++;
		});
		return botCount;
	},

	// membercount.js
	checkMembers: function(guild) {
		let memberCount = 0;
		guild.members.cache.forEach(member => {
			if (!member.user.bot) memberCount++;
		});
		return memberCount;
	},

	// eval,js
	clean: function(string) {
		if (typeof text === "string") {
			return string.replace(/`/g, "`" + String.fromCharCode(8203))
				.replace(/@/g, "@" + String.fromCharCode(8203));
		}
		else {
			return string;
		}
	},

	// color.js
	isHex: function(string) {
		let str = string;
		if(str.charAt(0) === "#") {
			str = str.slice(1);
		}
		return typeof str === "string"
		&& str.length === 6
		&& !isNaN(Number("0x" + str));
	},

	// color.js
	stringToHex: function(string) {
		let hash = 0;
		for (let i = 0; i < string.length; i++) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}
		let colour = "#";
		for (let i = 0; i < 3; i++) {
			const value = (hash >> (i * 8)) & 0xFF;
			colour += ("00" + value.toString(16)).substr(-2);
		}
		return colour;
	},

	// owoify.js
	owoify: function(text) {
		text = text.replace(/[lr]/g, "w");
		text = text.replace(/u/g, "uw");
		text = text.replace(/[LR]/g, "W");
		text = text.replace(/U/g, "UW");
		return text;
	},

	// spongebob.js
	alternateCaps: function(text) {
		const array = text.split("");
		const n = text.length;
		let out = "";
		let caps = false;

		for (let i = 0; i < n; i++) {
			if (!/[A-Za-z]/.test(array[i])) {
				out += array[i];
				continue;
			}

			if (caps) out += array[i].toUpperCase();
			else out += array[i].toLowerCase();

			caps = !caps;
		}
		return out;
	},

	// message.js
	is_url: function(string) {
		const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
		if(regexp.test(string)) {
			return true;
		}
		else {
			return false;
		}
	},

	// message.js
	is_invite: function(string) {
		const regexp = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
		if(regexp.test(string)) {
			return true;
		}
		else {
			return false;
		}
	},

	// scramble.js
	shuffle: function(word) {
		let shuffledWord = "";
		word = word.split("");
		while (word.length > 0) {
			shuffledWord += word.splice(word.length * Math.random() << 0, 1);
		}
		return shuffledWord;
	},

	// hack.js & tableflip.js
	delay: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	// roleinfo.js
	formatPerms: function(perm) {
		return perm
			.toLowerCase()
			.replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
			.replace(/_/g, " ")
			.replace(/Use Vad/g, "Use Voice Acitvity")
			.replace(/Send Tts Messages/g, "Send text-to-speech Messages");
	},

	// soccer.js
	randomNoRepeat: function(array) {
		let copy = array.slice(0);
		if (copy.length < 1) { copy = array.slice(0); }
		const index = Math.floor(Math.random() * copy.length);
		const item = copy[index];
		copy.splice(index, 1);
		return item;
	},

	validatePermissions: function(permissions) {
		const validPermissions = [
			"CREATE_INSTANT_INVITE",
			"KICK_MEMBERS",
			"BAN_MEMBERS",
			"ADMINISTRATOR",
			"MANAGE_CHANNELS",
			"MANAGE_GUILD",
			"ADD_REACTIONS",
			"VIEW_AUDIT_LOG",
			"PRIORITY_SPEAKER",
			"STREAM",
			"VIEW_CHANNEL",
			"SEND_MESSAGES",
			"SEND_TTS_MESSAGES",
			"MANAGE_MESSAGES",
			"EMBED_LINKS",
			"ATTACH_FILES",
			"READ_MESSAGE_HISTORY",
			"MENTION_EVERYONE",
			"USE_EXTERNAL_EMOJIS",
			"VIEW_GUILD_INSIGHTS",
			"CONNECT",
			"SPEAK",
			"MUTE_MEMBERS",
			"DEAFEN_MEMBERS",
			"MOVE_MEMBERS",
			"USE_VAD",
			"CHANGE_NICKNAME",
			"MANAGE_NICKNAMES",
			"MANAGE_ROLES",
			"MANAGE_WEBHOOKS",
			"MANAGE_EMOJIS",
			"BOT_OWNER",
		];

		for (const permission of permissions) {
			if (!validPermissions.includes(permission)) {
				throw new Error(`Unknown permission "${permission}"`);
			}
		}
	},
};