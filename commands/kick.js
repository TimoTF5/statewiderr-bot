const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.get(args[0]));
    if (!kUser) return message.channel.send("Kan die gebruiker niet vinden");
    let kReason = args.slice(1).join(" ");
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":x: **Sorry, dit kan ik niet voor je doen...**");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **Dit persoon kan niet gekickt worden...**");

    let kickEmbed = new Discord.RichEmbed()
        .setTitle("Kicked Gebruiker")
        .setColor("#ff8552")
        .addField("Gekickte gebruiker", `${kUser} with ID ${kUser.id}`)
        .addField("Gekickt door", `<${message.author.id}> with ID ${message.author.id}`)
        .addField("Gekickt in", `${message.channel}`)
        .addField("Tijd", `${message.createdAt}`)
        .addField("Reden", `${kReason}`);

    let kickChannel = message.guild.channels.find(`name`, "staff-mutes-kicks-bans");
    if (!kickChannel) return message.channel.send("Kan het kicks-bans kanaal niet vinden.");

    message.guild.member(kUser).kick(kReason);
    message.delete().catch();
    try {
        await kUser.send(`**Je bent gekickt uit de LionDesigns server voor de volgende reden:** "${kReason}".`);
        await kUser.send("**Je kunt opnieuw de server joinen als je een invite kunt vinden, maar volgende keer word je verbannen!**");
    } catch (e) {
        console.log(e.stack);
        message.channel.send(`:white_check_mark: ${kUser} **is uit de server gekickt!..**`);
    }

    return;
}

module.exports.help = {
    name: "kick"
}