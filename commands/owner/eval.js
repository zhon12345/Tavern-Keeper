const { Type } = require("@extreme_hero/deeptype");
const { MessageEmbed } = require("discord.js");
const { clean } = require("../../functions");
const url = "https://hasteb.in/documents";
const fetch = require("node-fetch");
const { inspect } = require("util");

module.exports = {
	name: "eval",
	category: "Owner",
	aliases: ["ev"],
	description: "Evaluate a specified JavaScript code.",
	usage: "eval <code>",
	userperms: ["BOT_OWNER"],
	botperms: ["USE_EXTERNAL_EMOJIS"],
	run: async (client, message, args) => {
		const code = args.join(" ").replace(/[“”]/g, "\"").replace(/[‘’]/g, "'");
		if (!args.length) {
			return message.channel.send(
				"<:vError:725270799124004934> Please provide valid code.",
			);
		}

		try {
			const start = process.hrtime();
			let evaled = eval(code);
			if(evaled instanceof Promise) {
				evaled = await evaled;
			}
			const stop = process.hrtime(start);
			const output = clean(inspect(evaled, { depth: 0 }), client);
			if(output.length > 1024) {
				let response;
				try {
					response = await fetch(url, { method: "POST", body: output, headers: { "Content-Type": "text/plain" } }).then(res => res.json());
				}
				catch (e) {
					return message.channel.send("<:vError:725270799124004934> An error occured, please try again!");
				}

				const embed = new MessageEmbed()
					.setTitle("Success!")
					.setColor("GREEN")
					.setFooter(`Type: ${new Type(evaled).is} | Time Taken: ${(((stop[0] * 1e9) + stop[1]) / 1e6)}ms`)
					.addField("Input", `\`\`\`js\n${code}\`\`\``)
					.addField("Output", `\`\`\`\nhttps://hasteb.in/${response.key}.js\n\`\`\``);
				await message.channel.send(embed);
			}
			else {
				const embed = new MessageEmbed()
					.setTitle("Success!")
					.setColor("GREEN")
					.setFooter(`Type: ${new Type(evaled).is} | Time Taken: ${(((stop[0] * 1e9) + stop[1]) / 1e6)}ms`)
					.addField("Input", `\`\`\`js\n${code}\`\`\``)
					.addField("Output", `\`\`\`js\n${output}\n\`\`\``);
				await message.channel.send(embed);
			}
		}
		catch (err) {
			const embed = new MessageEmbed()
				.setTitle("Error!")
				.setColor("RED")
				.addField("Input", `\`\`\`js\n${code}\`\`\``)
				.addField("Output", `\`\`\`xl\n${clean(err)}\n\`\`\``);
			await message.channel.send(embed);
		}
	},
};