const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "instagram",
	aliases: ["insta"],
	category: "Info",
	description: "Find a user's instagram statistics.",
	usage: "instagram <user>",
	disabled: false,
	userperms: [],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const name = args.join(" ");
		if (!name) {
			return message.channel.send("`❌` User not found, please provide a valid user (eg. `Nike`).");
		}

		const url = `https://instagram.com/${name}/?__a=1`;

		let response;
		try {
			response = await fetch(url, {
				headers: {
					cookie: "sessionid=5442744739%3Azpl9fG3FjGXtH7%3A0",
				},
			}).then((res) => res.json());
		} catch {
			return message.channel.send("`❌` An error occurred, please try again!");
		}

		try {
			const account = response.graphql.user;
			const embed = new MessageEmbed()
				.setColor("BLUE")
				.setTitle(`${account.username}'s Instagram Profile`)
				.setURL(`https://instagram.com/${account.username}`)
				.setThumbnail(account.profile_pic_url_hd)
				.setDescription(account.biography.length > 0 ? account.biography : "`None`")
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
		} catch {
			return message.channel.send("`❌` User not found, please provide a valid user (eg. `Nike`).");
		}
	},
};
