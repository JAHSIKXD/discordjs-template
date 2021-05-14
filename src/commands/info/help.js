const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name : 'help',
    run: async ({client, message, args, MessageEmbed}) => {

    if (!args[0]) {
      let categories = [];

      readdirSync("./src/commands/").forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
            let file = require(`${process.cwd()}/src/commands/${dir}/${command}`);
          if (!file.name) return "Brak komendy";
          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "W trakcie robienia" : cmds.join(", "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("Pomoc")
        .addFields(categories)
        .setFooter(`Wykonano przez ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
        .setTimestamp()
        .setColor("YELLOW");
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
        .setTitle("ERROR!")
          .setDescription(`Nieprawidłowe użycie komendy! Spróbuj użyc \`help\` żeby dowiedzieć się o wszystkich komendach`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Informacje o komendzie")
        .setDescription(`Aktualnie przeglądasz informacje o komendzie \`${command.name}\`\n \`<>\` <- zmienna`)
        .addField(
          "Komenda:",
          command.name ? `\`${command.name}\`` : "Brak nazwy tej komendy (Błąd? :O)"
        )
        .addField(
          "Aliasy:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Brak aliasów do tej komendy"
        )
        .addField(
          "Przykładowe użycie:",
          command.usage
            ? `\`${command.name} ${command.usage}\``
            : `\`${command.name}\``
        )
        .addField(
          " Opis komendy:",
          command.description
            ? command.description
            : "Brak."
        )
        .addField(
          "Wymagana Permisja:",
          command.perm ? command.perm : "Brak."
        )
        .setFooter(`Wykonano przez ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
        .setTimestamp()
        .setColor("RANDOM");
      return message.channel.send(embed);
    }
  },
};