/* eslint-disable no-unused-vars */
module.exports = {
	name: 'kill',
	category: 'Fun',
	description: 'attempt to kill a specified user.',
	aliases: [],
	usage: 'kill <user>',
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;
		const n = Math.floor(Math.random() * 10);
		if(n == 0) {
			message.channel.send(`${message.author.username} couldn't handle the recoil! ${message.author.username}'s assassination attempt on ${user.username} has failed!`);
		}
		else if(n == 1) {
			message.channel.send(`${message.author.username}'s bullet ricochets off of a metal object and strikes ${message.author.username} right in the forehead!`);
		}
		else if(n == 2) {
			message.channel.send(`${message.author.username} absolutely obliterates ${user.username}!`);
		}
		else if(n == 3) {
			message.channel.send(`${message.author.username} takes their aim and ${user.username}'s head explodes!`);
		}
		else if(n == 4) {
			message.channel.send(`${message.author.username} readies their weapon and blows up ${user.username}'s house!`);
		}
		else if(n == 5) {
			message.channel.send(`${user.username} died from subscribing to t-series`);
		}
		else if(n == 6) {
			message.channel.send(`${user.username} died from lack of healthcare, thanks america!`);
		}
		else if(n == 7) {
			message.channel.send(`${user.username} died from shitting for 36 hours straight.`);
		}
		else if(n == 8) {
			message.channel.send(`${message.author.username} kills ${user.username} after hours of torture.`);
		}
	},
};