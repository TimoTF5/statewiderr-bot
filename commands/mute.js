const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply("Couldn't find user.");
  if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: **Sorry, I can't do that for you...**");
  let muterole = message.guild.roles.find(`name`, "muted");

  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#ff0000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if (!mutetime) return message.reply("You didn't specify a time!");
  let muteEmbed = new Discord.RichEmbed()
    .setTitle("Muted User")
    .setColor("#136f63")
    .addField("Muted User", `${tomute} with ID ${tomute.id}`)
    .addField("Muted By", `<${message.author.id}> with ID ${message.author.id}`)
    .addField("Muted In", `${message.channel}`)
    .addField("Time", `${message.createdAt}`)
    .addField("Duration", `${ms(mutetime)}`);

  let muteChannel = message.guild.channels.find(`name`, "kicks-mutes-bans");
  if (!muteChannel) return message.channel.send("Couldn't find incidents channel");

  message.delete().catch();
  muteChannel.send(muteEmbed);

  await (tomute.addRole(muterole.id));
  message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function () {
    tomute.removeRole(muterole.id);
    message.channel.send(`<:white_check_mark: **@${tomute.id}> has been unmuted!..**`);
  }, ms(mutetime));
}

module.exports.help = {
  name: "mute"
}