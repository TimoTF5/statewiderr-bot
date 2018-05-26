const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    let avatarURL = user.avatarURL;

    let avatarEmbed = new Discord.RichEmbed()
        .setColor("#57ACDF")
        .setDescription(`${user} 's avatar`)
        .setImage(avatarURL);

    message.channel.send(avatarEmbed);
    return;
}

module.exports.help = {
    name: "avatar"
}