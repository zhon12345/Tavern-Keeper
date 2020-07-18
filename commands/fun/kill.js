/* eslint-disable no-unused-vars */
module.exports = {
	name: 'kill',
	category: 'Fun',
	description: 'Attempt to kill a specified user.',
	aliases: [],
	usage: 'kill <user>',
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;
		const n = [
			`${message.author.username} couldn't handle the recoil! ${message.author.username}'s assassination attempt on ${user.username} has failed!`,
			`${message.author.username}'s bullet ricochets off of a metal object and strikes ${message.author.username} right in the forehead!`,
			`${message.author.username} absolutely obliterates ${user.username}!`,
			`${message.author.username} takes their aim and ${user.username}'s head explodes!`,
			`${message.author.username} readies their weapon and blows up ${user.username}'s house!`,
			`${user.username} died from subscribing to t-series`,
			`${user.username} died from lack of healthcare, thanks america!`,
			`${user.username} died from shitting for 36 hours straight.`,
			`${message.author.username} kills ${user.username} after hours of torture.`,
		];
		const randomAnswer = n[Math.floor(Math.random() * n.length)];
		message.channel.send(randomAnswer);
	},
};