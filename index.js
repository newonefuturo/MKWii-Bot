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


bot.on("message", message => {
  if (message.content === "test") {
  var embed = new Discord.RichEmbed()
  .setTitle("Welcome to MKWiimmfi Official!")
  .setColor("#5f05a8")
  .setDescription("Please tell us which tracks and game modes you play via the command mk!selfrole -role you want-. Include any optional roles first then the mandatory role you want. **If the bot @Hideyoshi Kinoshita is offline, message a @Chat Staff instead with the roles you want.**")
  .addField("Roles List", "-------------------------------------------------------------------------------")
  .addField("Optional Roles (any or none of these may be chosen):", "**Battler, Karter, Countdown Player**")
  .addField("Mandatory Roles (one may only be chosen):", "**All Tracks Player, Regular Tracks Player, Custom Tracks**")
  .addField("Example:", "mk!selfrole Karter and then !selfrole All Tracks Player")
  .addField("__IF YOU ONLY USE BIKES DO NOT SELECT THE KARTER ROLE.__", "__**IF YOU DO NOT PLAY CUSTOM TRACKS OR KNOW WHAT THEY ARE DO NOT SELECT THE ALL TRACKS PLAYER ROLE.**__")
  message.channel.send({embed:embed})
  }
})
