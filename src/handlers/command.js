const { readdirSync } = require("fs");
module.exports = client => {
  readdirSync("./src/commands/").forEach(folder => {
    readdirSync(`./src/commands/${folder}/`).forEach(file => {
	  const dir = `${process.cwd()}/src/commands/${folder}/${file}`;
      client.loader.load({file, folder, dir});
    });
  });
};
