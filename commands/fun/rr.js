/* eslint-disable no-unused-vars */
module.exports = {
	name: 'rr',
	category: 'Fun',
	description: 'Gamble with your life and play russian roulette.',
	aliases: ['russianroulette'],
	usage: 'rr',
	run: async (client, message, args) => {
		const rr_bullet = Math.floor(Math.random() * 6);
		const rr_count = 1 ;
		message.channel.send('You spin the cylinder of the revolver with 1 bullet in it...');
		setTimeout(function() {
			message.channel.send('...you place the muzzle against your head and pull the trigger...');
		}, 1000);
		setTimeout(function() {
			if (rr_bullet == rr_count) {
				message.channel.send('...your brain gets splattered all over the wall.');
			}
			else {
				message.channel.send('...you live to see another day.');
			}
		}, 3000);
	},
};