const { readdirSync } = require("fs");

module.exports = client => {
  readdirSync("./src/events/").forEach(file => {
    if (!file.endsWith(".js")) return;
    const eventName = file.split(".")[0];
    const eventFile = require(`../events/${file}`);
    client.on(eventName, eventFile.bind(null, client));
    console.log(`Załadowano event ${file}`);
  });
};
