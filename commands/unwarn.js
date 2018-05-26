const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: **Sorry, I can't help you with...**");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!wUser) return message.reply("Can't find that person.");
  if (wUser.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: **Sorry, I can't do that for you...**");
  let reason = args.join(" ").slice(22);

  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

  if (!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns--;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnChannel = message.guild.channels.find(`name`, "reports-warnings");
  if (!warnChannel) return message.reply(":x: **I can't find the reports-warnings channel...**");

  warnChannel.send(`:white_check_mark: ${wUser} **has 1 warning less. In total he now has** ${warns[wUser.id].warns} **warnings...**`);
}

module.exports.help = {
  name: "unwarn"
}