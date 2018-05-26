const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
    disableEveryone: true
});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log("SRR Bot has been launced to Online.")
    bot.user.setActivity("statewiderr.com - !!help", {
        type: "PLAYING"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

    let number = JSON.parse(fs.readFileSync("./ticketnumber.json", "utf8"));

    function makeChannel(message) {
        let ticket = "ticket"
        let server = message.guild;
        let name = message.author.username;
        number[message.guild.id].numbers++;
        let ticketnumber =  number[message.guild.id];

        server.createChannel("ticket-" + ticketnumber);

        fs.writeFile("./ticketnumber.json", JSON.stringify(numbers), (err) => {
            if (err) console.log(err)
        });
    }

    if (command === `${prefix}new`) {
        makeChannel(message);
    }

});

bot.on(`guildMemberAdd`, async member => {
    console.log(`${member.id} has joined the server!`);
    let welcomechannel = member.guild.channels.find(`name`, "welcome-misc");
    const logchannel = message.guild.channels.find(`name`, "main-logs");
    let jEmbed = new Discord.RichEmbed()
        .setDescription(`${member} has joined the server!`)
        .setColor("#5da271");
    welcomechannel.send(jEmbed);
    logchannel.send(jEmbed);
});

bot.on(`guildMemberRemove`, async member => {
    console.log(`${member.id} has left the server!`);
    let welcomechannel = member.guild.channels.find(`name`, "welcome-misc");
    const logchannel = message.guild.channels.find(`name`, "main-logs");
    let lEmbed = new Discord.RichEmbed()
        .setDescription(`${member} has left the server...`)
        .setColor("ef8354");
    welcomechannel.send(lEmbed);
    logchannel.send(lEmbed);
});

bot.on("messageDelete", (messageDelete) => {
    if (messageDelete.author.bot) return;
    let logChannel = messageDelete.guild.channels.find("name", `main-logs`);
    if (!logChannel)
        return;
    const embed4 = new Discord.RichEmbed()
        .setTitle("Deleted Message:")
        .setColor("RANDOM")
        .setThumbnail(messageDelete.author.displayAvatarURL)
        .setDescription(`**Message sent by**  ${messageDelete.author.tag} Was Deleted in ${messageDelete.channel}\n${messageDelete.content}`)
        .setTimestamp()
    logChannel.send(embed4)
    return;
});

bot.login(tokenfile.token);