const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, can't do that for you.");
  let botmessage = args.slice(0).join(" ");

  let botEmbed = new Discord.RichEmbed()
    .setColor("#57ACDF")
    .setFooter (`Verzonden door: ${setUsername}`)
    .setDescription("botmessage");
    
    
  message.delete().catch();
  message.channel.send(botEmbed);
}

module.exports.help = {
  name: "say"
}