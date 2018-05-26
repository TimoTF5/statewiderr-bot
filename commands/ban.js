const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.mentions.members.first();
    if (!bUser) return message.channel.send(":x: **Sorry, you need to do: !!ban (user) (reason)...**");
    let bReason = args.slice(1).join(" ");
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":x: **Sorry, I can't do that for you...**");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **This person can't get banned...**");

    let banEmbed = new Discord.RichEmbed()
        .setTitle("Banned user")
        .setColor("#d00000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned by", `<${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned in", `${message.channel}`)
        .addField("Time", `${message.createdAt}`)
        .addField("Reason", `${bReason}`);

    let banChannel = message.guild.channels.find(`name`, "kicks-mutes-bans");
    if (!banChannel) return message.channel.send(":x: **I can't find the kicks-mutes-bans channel...**");

    message.guild.member(bUser).ban(bReason);
    message.delete().catch();
    try {
        await bUser.send(`(**You are banned from Statewide Realistic Roleplay with the next reasons:** "${bReason}"`);
    } catch (e) {
        console.log(e.stack);
        message.channel.send(`***:white_check_mark: ${bUser} Is banned!..***`);
    }

    return;
}

module.exports.help = {
    name: "ban"
}