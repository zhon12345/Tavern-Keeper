module.exports = {
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

	// rps.js
	getResult: function(me, clientChosen) {
		if ((me === '🗻' && clientChosen === '✂') ||
			(me === '📰' && clientChosen === '🗻') ||
			(me === '✂' && clientChosen === '📰')) {
			return 'You won!';
		}
		else if (me === clientChosen) {
			return 'It\'s a tie!';
		}
		else {
			return 'You lost!';
		}
	},

	// botinfo.js
	formatBytes: function(a, b) {
		if (a == 0) return '0 Bytes';
		const c = 1024,
			d = b || 2,
			e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			f = Math.floor(Math.log(a) / Math.log(c));

		return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
	},

	// channelinfo.js, uptime.js & botinfo.js
	parseDur: function(ms) {
		let seconds = ms / 1000;

		const days = parseInt(seconds / 86400);
		seconds = seconds % 86400;

		const hours = parseInt(seconds / 3600);
		seconds = seconds % 3600;

		const minutes = parseInt(seconds / 60);
		seconds = parseInt(seconds % 60);

		if (days) {
			return `${days} day, ${hours} hours, ${minutes} minutes`;
		}
		else if (hours) {
			return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
		}
		else if (minutes) {
			return `${minutes} minutes, ${seconds} seconds`;
		}
		return `${seconds} second(s)`;
	},

	// aliases.js & help.js
	capitalizeFirstLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	// evaljs
	clean: function(string) {
		if (typeof text === 'string') {
			return string.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		}
		else {
			return string;
		}
	},

	// owoify.js
	owoify: function(text) {
		text = text.replace(/[lr]/g, 'w');
		text = text.replace(/u/g, 'uw');
		text = text.replace(/[LR]/g, 'W');
		text = text.replace(/U/g, 'UW');
		return text;
	},

	// leetify.js
	leetify: function(text) {
		text = text.replace(/a/ig, '4');
		text = text.replace(/e/ig, '3');
		text = text.replace(/l/ig, '1');
		text = text.replace(/o/ig, '0');
		text = text.replace(/s/ig, '5');
		text = text.replace(/t/ig, '7');
		return text;
	},

	// spongebob.js
	alternateCaps: function(text) {
		const array = text.split('');
		const n = text.length;
		let out = '';
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

	// color.js
	isHex: function(string) {
		let str = string;
		if(str.charAt(0) == '#') {
			str = str.slice(1);
		}
		return typeof str === 'string'
		&& str.length === 6
		&& !isNaN(Number('0x' + str));
	},

	// color.js
	stringToHex: function(string) {
		let hash = 0;
		for (let i = 0; i < string.length; i++) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}
		let colour = '#';
		for (let i = 0; i < 3; i++) {
			const value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	},

	// tableflip.js, hack.js, russianroulette.js & fight.js
	delay: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	// scramble.js
	shuffle: function(word) {
		let shuffledWord = '';
		word = word.split('');
		while (word.length > 0) {
			shuffledWord += word.splice(word.length * Math.random() << 0, 1);
		}
		return shuffledWord;
	},

	// roleinfo.js
	formatPerms: function(perm) {
		return perm
			.toLowerCase()
			.replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
			.replace(/_/g, ' ')
			.replace(/Use Vad/g, 'Use Voice Acitvity')
			.replace(/Send Tts Messages/g, 'Send text-to-speech Messages');
	},
};