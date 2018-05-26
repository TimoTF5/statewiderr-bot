const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let membercount = message.guild.memberCount;
    let accuratecount = Math.floor(membercount - 7);

    let embed = new Discord.RichEmbed()
        .setTitle("Server status")
        .setColor("#57ACDF")
        .addField(`Current Number of Members:`, `${membercount}`);

    return message.channel.send(embed);
}

module.exports.help = {
    name: "stats"
}