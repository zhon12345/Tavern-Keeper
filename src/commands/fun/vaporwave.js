/* eslint-disable no-undef */
module.exports = {
	name: 'vaporwave',
	aliases: ['aesthetic'],
	description: 'Converts text into ｖａｐｏｒｗａｖｅ.',
	usage: 'vapourwave <text>',
	category: 'Fun',
	run: async (client, message, args) => {
		if(!args[0]) {
			return message.channel.send(
				'<:vError:725270799124004934> Please provide valid text.',
			).then(message.delete({ timeout: 5000 })).then(msg => {msg.delete({ timeout: 5000 });});
		}

		let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789.?!,:;"\'-_+%=$*(){}[]<>|/~\\@&%£#';
		letters = letters.split('');
		let wp = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ　０１２３４５６７８９．？！，：；＂＇－＿＋％＝＄＊（）｛｝［］＜＞｜／～＼＠＆％￡＃';
		wp = wp.split('');
		let text = args.join(' ');
		text = text.split('');
		for (i = 0; i < text.length; i++) {
			text[i] = wp[letters.indexOf(text[i])];
		}
		message.channel.send(text.join(''));
	},
};