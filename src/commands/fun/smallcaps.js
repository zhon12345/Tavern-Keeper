/* eslint-disable no-undef */
module.exports = {
	name: 'smallcaps',
	description: 'Converts text into small uppercase letters.',
	usage: 'smallcaps <text>',
	category: 'Fun',
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.?!,:;"\'-_+%=$*(){}[]<>|/~\\@&%£#';
		letters = letters.split('');
		let ss = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.?!,:;"\'-_+%=$*(){}[]<>|/~\\@&%£#';
		ss = ss.split('');

		let text = args.join(' ');
		text = text.toLowerCase();
		text = text.split('');
		for (i = 0; i < text.length; i++) {
			text[i] = ss[letters.indexOf(text[i])];
		}
		message.channel.send(text.join(''));
	},
};