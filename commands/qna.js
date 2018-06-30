const Discord = require('discord.js');


exports.run = (bot, message, args) => {
  // Simple command
  var embed = new Discord.RichEmbed()
  .setTitle("QnA")
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter("Developed by ThatMajesticGuy", bot.users.get("262410813254402048").displayAvatarURL)
  .setDescription("This is a list of questions and answers that users have asked or may ask, if your question is not here, ask a moderator for an answer.")
  .addField("How do you install CTGP?", "You can install it from [Here](http://www.chadsoft.co.uk/), and you can follow the install guide from there")
  .addField("How do I get to the leaderboards?", "You have to beat the records of everyone on the specified track you want to set a record in. This will get you on [this leaderboard](http://www.chadsoft.co.uk/time-trials/)")
  msg.channel.send({embed: embed})
}

exports.help = {
  name: "qna",
  description: "Has a QNA for questions people ask in the server",
  usage: "mk!qna"
}

exports.aliases = []
