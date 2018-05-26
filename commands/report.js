const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("Can't find that user.");
  let reason = args.slice(1).join(" ");

  let reportembed = new Discord.RichEmbed()
    .setTitle("Report `${rUser}`")
    .setColor("ff8552")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("In Channel", `${message.channel}`)
    .addField("Time", `${message.createdAt}`)
    .addField("Reason(s)", `${reason}`);
    
  let reportschannel = message.guild.channels.find(`name`, "reports-warnings");
  if (!reportschannel) return message.channel.send(":x: **I can't find the report channel...**");

  message.delete().catch();
  reportschannel.send(reportembed);
  return;
}

module.exports.help = {
  name: "report"
}