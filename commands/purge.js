const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: **You don't have the right premissions...**");
  if (!args[0]) return message.channel.send("**Its should be great if you give me the amount of the messages...**");
  message.delete().catch();
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:white_check_mark: **${args[0]} messages deleted...**`).then(msg => msg.delete(1000));
  });
}

module.exports.help = {
  name: "purge"
}