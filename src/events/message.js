const { MessageEmbed } = require("discord.js");
module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefix = client.config.settings.prefix;

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    return message.reply(`Mój prefix to ${prefix}`);
  }

  if (!prefix || !message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!cmd) return;
  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  if (!message.guild.me.hasPermission("EMBED_LINKS"))
    return message.reply("Bot nie posiada permisji wysyłania wiadomosci embed!");
  if (command.perm && !client.config.dev.includes(message.author.id)) {
    let index = false;
    command.perm.forEach(async perm => {
      if (perm == "dev" && !client.config.dev.includes(message.author.id)) {
        const errPerms = new MessageEmbed()
        .setAuthor(`Błąd!`)
          .setColor("RED")
          .setDescription('Ta komenda jest przeznaczona dla programistów')
          .setFooter(message.author.tag, message.author.displayAvatarURL());
        index = true;
        return message.reply(errPerms);
      } else if (perm != "dev" && !message.member.hasPermission(perm)) {
        const errPerms = new MessageEmbed()
          .setAuthor(`Błąd!`)
          .setColor("RED")
          .setDescription(`Nie posiadasz permisji [${perm}](${message.url}), aby użyć tej komendy!`)
          .setFooter(message.author.tag, message.author.displayAvatarURL());
        index = true;
        return message.reply(errPerms);
      }
    });
    if (index) return;
  }

  if (command.botperm) {
    let index = false;
    command.botperm.forEach(async perm => {
      if (perm != "dev" && !message.guild.me.hasPermission(perm)) {
        const errPerms = new MessageEmbed()
        .setAuthor(`Błąd!`)
          .setColor("RED")
          .setDescription(`Bot nie posiada permisji [${perm}](${message.url})`)
          .setFooter(message.author.tag, message.author.displayAvatarURL());
        return message.reply(errPerms);
        index = true;
      }
    });
    if (index) return;
  }

  command.run({client, message, args, prefix, command, MessageEmbed}).catch(err => {
    return console.error(err);
  });
};
