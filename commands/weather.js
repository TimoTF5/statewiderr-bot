const Discord = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {
    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if (err) message.channel.send(err);
        if (result.length === 0) {
            message.channel.send("Please enter a valid place.");
            return;
        }
        var current = result[0].current;
        var location = result[0].location;

        const weatherEmbed = new Discord.RichEmbed()
        .setDescription(`${current.skytext}`)
        .setAuthor(`The weather for ${current.observationpoint} | ⛅`)
        .setColor("#57ACDF")
        .addField("Timezone", `\`\`\`UTC${location.timezone}\`\`\``)
        .addField("degree type", `\`\`\`${location.degreetype}\`\`\``, true)
        .addField("Temperature", `\`\`\`${current.temperature}\`\`\``)
        .addField("Feels like", `\`\`\`${current.feelslike}\`\`\``)
        .addField("Winden", `\`\`\`${current.winddisplay}\`\`\``, true)
        .addField("Humidity", `\`\`\`${current.humidity}%\`\`\``, true);

        message.channel.send(weatherEmbed);
        return;
    })
}

module.exports.help = {
    name: "weather"
}