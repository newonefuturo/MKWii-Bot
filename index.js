const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "mk!";

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.login(process.env.BOT_TOKEN)

bot.on('ready', () => {
  console.log('ready!')
  bot.user.setActivity("Mario Kart Wii [mk!help for help]")
});

require('fs').readdir("./commands", (err, files) => {
    if(err) console.error((err));
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Do you mind making the commands first?");
        return;
    }


    console.log(`\n\nLoading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/${f}`)]
        let props = require(`./commands/${f}`)
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
    });

    });
 });

 bot.on("message", async message => {
     if(message.author.bot) return;

      if(message.channel.type === "dm") {
          message.channel.send("Silly! Commands don't work here!")
          return;
     }

     let messageArray = message.content.split(/\s+/g);
     let command = messageArray[0];
     let args = messageArray.slice(1);

     if(!command.startsWith(prefix)) return;

     if (bot.aliases.has(command.slice(prefix.length).toLowerCase())) {
         bot.commands.get(bot.aliases.get(command.slice(prefix.length).toLowerCase())).run(bot, message, args)
     }
         if (bot.commands.has(command.slice(prefix.length).toLowerCase())) {
          bot.commands.get(command.slice(prefix.length).toLowerCase()).run(bot, message, args)
         }

 });
