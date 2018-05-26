const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botIcon = bot.user.displayAvatarURL;

    let botEmbed = new Discord.RichEmbed()
        .setTitle("Bot information")
        .setColor("#57ACDF")
        .addField("Bot name:", `${bot.user.username}`)
        .setFooter("Created by Timo Nismo (TimoTF5#6969).");

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "botinfo"
}