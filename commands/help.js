const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  
  let sicon = message.guild.iconURL;
  let toMessage = message.author;

  let commandsEmbed = new Discord.RichEmbed()
    .setTitle("Commands | 📇")
    .setColor("#57ACDF")
    .setThumbnail(sicon)
    .addField("!!help - You get all of the available commands for everyone.")
    .addField("!!avatar (name of person) - Get the avatar of that person")
    .addField("!!report (user tag) (reasons) - Report someone for breaking a rule.") 
    .addField("!!stats - Get the status of the mark of members and more.")
    .addField("!!weather (place) - get the weather of the place what you picked.")

  let embed = new Discord.RichEmbed()
    .setColor("#61ff7e")
    .setDescription(":white_check_mark: I have send you the commands in PM!");

  message.delete().catch();

  try {
    await toMessage.send(commandsEmbed);
    return message.channel.send(embed);
  } catch (e) {
    console.log(e.stack);
    message.reply("Change your privacy settings. I can't send you a PM...");
  }
}

module.exports.help = {
  name: "help"
}