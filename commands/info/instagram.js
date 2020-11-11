const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "instagram",
	aliases: ["insta"],
	category: "Info",
	description: "Find a user's instagram statistics.",
	usage: "instagram <user>",
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const name = args.join(" ");
		if (!name) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid user",
			);
		}

		const url = `https://instagram.com/${name}/?__a=1`;

		let response;
		try {
			response = await fetch(url, {
				headers: {
					cookie: "sessionid=5442744739%3Azpl9fG3FjGXtH7%3A0",
				},
			}).then(res => res.json());
		}
		catch (e) {
			console.log(e);
			return message.channel.send(
				"<:vError:725270799124004934> An error occured, please try again!",
			);
		}

		try {
			const account = response.graphql.user;
			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle(`${name}'s Instagram Profile`)
				.setURL(`https://instagram.com/${name}`)
				.setThumbnail(account.profile_pic_url_hd)
				.setDescription(account.biography.length > 0 ? "None" : account.biography)
				.setFooter(`Requested by ${message.author.tag}`)
				.setTimestamp()
				.addField("<:documents:773950876347793449> General ❯", [
					`> **<:card:773965449402646549> Name: \`${account.full_name}\`**`,
					`> **\\📇 ID: \`${account.id}\`**`,
					`> **\\👦 Avatar: [\`Click here!\`](${account.profile_pic_url_hd})**`,
					`> **\\👥 Followers: \`${account.edge_followed_by.count.toLocaleString()}\` Followers**`,
					`> **\\👤 Following: \`${account.edge_follow.count.toLocaleString()}\` Following**`,
					`> **\\📷 Posts: \`${account.edge_owner_to_timeline_media.count.toLocaleString()}\` Posts**`,
					`> **\\🔐 Private: \`${account.is_private ? "Yes" : "No"}\`**`,
					`> **<:instaverified:775758117513199626> Verified: \`${account.is_verified ? "Yes" : "No"}\`**`,
				]);
			message.channel.send(embed);
		}
		catch (err) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide a valid user",
			);
		}
	},
};