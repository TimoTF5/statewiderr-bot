const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let Owner = message.author;
    if(Owner.id !== "229258267187085316") {
       return message.channel.send(':x: Only the owner can do that!');
    } else {
      bot.user.setActivity(args.join(" "));
    }
}

module.exports.help = {
    name: "setgame"
}