const Discord = require('discord.js');
const request = require('request');
const dateformat = require('dateformat')

exports.run = (bot, message, args) => {
  // Get The JSON
  const url = "http://tt.chadsoft.co.uk/index.json"
  request({
      url: url,
      json: true
  }, function (error, response, body) {
body = JSON.parse(body.trim())
      if (!error && response.statusCode === 200) {
        // There is probably a better way to do this, but ill just go with this for now
        let track0;
        let track1;
        let track2;
        let track3;
        let track4;
        let track5;
        let track6;
        let track7;
        let track8;
        let track9;
        if (body.recentRecords[0].defaultTrack === false) track0 = "which is a Custom Track"
        if (body.recentRecords[0].defaultTrack === true) track0 = "which is a Nintendo Track"
        if (body.recentRecords[1].defaultTrack === false) track1 = "which is a Custom Track"
        if (body.recentRecords[1].defaultTrack === true) track1 = "which is a Nintendo Track"
        if (body.recentRecords[2].defaultTrack === false) track2 = "which is a Custom Track"
        if (body.recentRecords[2].defaultTrack === true) track2 = "which is a Nintendo Track"
        if (body.recentRecords[3].defaultTrack === false) track3 = "which is a Custom Track"
        if (body.recentRecords[3].defaultTrack === true) track3 = "which is a Nintendo Track"
        if (body.recentRecords[4].defaultTrack === false) track4 = "which is a Custom Track"
        if (body.recentRecords[4].defaultTrack === true) track4 = "which is a Nintendo Track"
        if (body.recentRecords[5].defaultTrack === false) track5 = "which is a Custom Track"
        if (body.recentRecords[5].defaultTrack === true) track5 = "which is a Nintendo Track"
        // Use the data to send this embed
        var embed = new Discord.RichEmbed()
        .setTitle("Recent New Records")
        .setDescription("These are the 5 newest records that have been achieved. This is not ordered from fastest to slowest.")
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter("Developed by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
        .addField("Custom Tracks", "------------------------------------------------------------------")
        .addField(`${body.recentRecords[0].player}:`, `The track is **${body.recentRecords[0].trackName} ${track0}** with a finishing time of **${body.recentRecords[0].finishTimeSimple}**. This was achieved on **${dateformat(body.recentRecords[0].dateSet, "dddd, mmmm dS, yyyy")}**`)
        .addField(`${body.recentRecords[1].player}:`, `The track is **${body.recentRecords[1].trackName} ${track1}** with a finishing time of **${body.recentRecords[1].finishTimeSimple}**. This was achieved on **${dateformat(body.recentRecords[1].dateSet, "dddd, mmmm dS, yyyy")}**`)
        .addField(`${body.recentRecords[2].player}:`, `The track is **${body.recentRecords[2].trackName} ${track2}** with a finishing time of **${body.recentRecords[2].finishTimeSimple}**. This was achieved on **${dateformat(body.recentRecords[2].dateSet, "dddd, mmmm dS, yyyy")}**`)
        .addField(`${body.recentRecords[3].player}:`, `The track is **${body.recentRecords[3].trackName} ${track3}** with a finishing time of **${body.recentRecords[3].finishTimeSimple}**. This was achieved on **${dateformat(body.recentRecords[3].dateSet, "dddd, mmmm dS, yyyy")}**`)
        .addField(`${body.recentRecords[4].player}:`, `The track is **${body.recentRecords[4].trackName} ${track4}** with a finishing time of **${body.recentRecords[4].finishTimeSimple}**. This was achieved on **${dateformat(body.recentRecords[4].dateSet, "dddd, mmmm dS, yyyy")}**`)
        .addField(`${body.recentRecords[5].player}:`, `The track is **${body.recentRecords[5].trackName} ${track5}** with a finishing time of **${body.recentRecords[5].finishTimeSimple}**. This was achieved on **${dateformat(body.recentRecords[5].dateSet, "dddd, mmmm dS, yyyy")}**`)
        message.channel.send({embed: embed})
      }
  })
}

exports.help = {
  name: "leaderboard",
  description: "Gets the Mario Kart Wii Leaderboard from chadsoft.co.uk",
  usage: "mk!leaderboard"
}

exports.aliases = []
