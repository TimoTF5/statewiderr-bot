const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.author.id || message.guild.members.get(args[0]);
  if (!wUser) return message.reply("Couldn't find that person.");

  let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

  if (!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  let warninglevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> heeft ${warninglevel} warnings. ⚠️`);

  fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });
}

module.exports.help = {
  name: "warnings"
}