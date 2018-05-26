const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Sorry, you don't have the premissions...");
    let wUser = message.mentions.members.first();
    if (!wUser) return message.reply(":x: **Sorry. Ik kan het aangegeven persoon niet vinden...**");
    if (wUser.hasPermission("MUTE_MEMBERS")) return message.reply(":x: **Sorry, this person has got a role that I can't warn...**");
    let reason = args.slice(1).join(" ");

    let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    let warnEmbed = new Discord.RichEmbed()
        .setTitle("**Warning User**")
        .setAuthor(message.author.username)
        .setColor("#57ACDF")
        .addField("Warned User", `<@${wUser.id}>`)
        .addField("Warned in", `${message.channel}`)
        .addField("Warned by", `${message.author}`)
        .addField("Number of warnings", `${warns[wUser.id].warns}`)
        .addField("Reason for Warning", `${reason}`);

    let warnChannel = message.guild.channels.find(`name`, "reports-warnings");
    if (!warnChannel) return message.reply(":x: **I can't find the ¨reports-warnings¨ channel...**");

    warnChannel.send(warnEmbed);

    message.delete().catch();

    if (warns[wUser.id].warns == 1) {
        await (wUser.addRole(warn1Role.id));
    }

    if (warns[wUser.id].warns == 2) {
        let muterole = message.guild.roles.find(`name`, "muted");
        if (!muterole) return message.reply(":x: **The mute role doesn't exist...**");

        let mutetime = "30m";
        await (wUser.addRole(muterole.id));
        message.channel.send(`<@${wUser.id}>":white_check_mark: **is muted for ${mutetime}.**`);

        setTimeout(function () {
            wUser.removeRole(muterole.id);
            message.channel.send(`<@${wUser.id}>":white_check_mark: **Is unmuted...**`);
        }, ms(mutetime));
        try {
            await wUser.send(`**You are muted on ${server.name}:** ${mutetime}.`);
            await wUser.send(`:warning: **Next time when you get warned you will get kicked!**`);
        } catch (e) {
            console.log(e.stack);
        }
    }

    if (warns[wUser.id].warns == 4) {
        await (wUser.removeRole(warn2Role.id));

        message.reply(`<@${wUser.tag}> :white_check_mark: **is kicked...**`);
        try {
            await wUser.send(`**You are kicked from the ${server.name} for the next reasons:** "${reason}"`);
            await wUser.send(`:warning: **You can rejoin the server, but if you get warned again you will get banned!..**`);
        } catch (e) {
            console.log(e.stack);
        }
        wUser.kick(reason);
    }

    if (warns[wUser.id].warns == 4) {
        message.reply(`<@${wUser.tag}> :white_check_mark: **is banned...**`);
        try {
            await wUser.send(`**You are banned from ${server.name} for the next reasons:** "${reason}"`);
            await wUser.send(`**You have in total get 5 warnings. **`);
        } catch (e) {
            console.log(e.stack);
        }
        wUser.ban(reason);
    }
}

module.exports.help = {
    name: "warn"
}