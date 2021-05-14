const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const client = new Client();

const Loader = require("./utils/loader.util");
require("./utils/logger.util");

client.config = require("./config");
client.commands = new Collection();
client.aliases = new Collection();
client.loader = new Loader(client);

readdirSync("./src/handlers").forEach(handler => {
  if (!handler.endsWith(".js")) return;
  console.log(`Załadowano ${handler}`);
  require(`./handlers/${handler}`)(client);
});

client.login(client.config.token);
