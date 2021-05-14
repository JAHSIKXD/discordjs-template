module.exports = {
  name: "reload",
  desc: "Restartuje bota",
  perm: ["dev"],
  usage: "<nazwa komendy>",
  run: async ({client, message, args, MessageEmbed}) => {
    if(!args[0]) return message.channel.send(`Wpisz jaką komendę przeładować`)
    if (!args[0] || (!client.commands.get(args[0]) && !client.aliases.get(args[0]))) return;
    const embed = new MessageEmbed()
     .setAuthor(`Przeładowanie`)
      .setDescription("Przeładowanie komendy")
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setTimestamp();
   message.channel.send(embed);
    const obj = client.loader.unload(args[0]);
    client.loader.load(obj);
  }
};
