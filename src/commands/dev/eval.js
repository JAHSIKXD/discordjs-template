module.exports = {
  name: "eval",
  desc: "Eval",
  perm: ["dev"],
  usage: "<kod>",
  run: async ({client, message, args}) => {
    if(!args[0]) return message.channel.send(`Nie wprowadziłeś kodu`)
    try {
      let evaled = eval(args.join(" "));
      if (typeof evaled == "object") evaled = JSON.stringify(evaled);
      message.channel.send(evaled, { code: "js" });
    } catch (err) {
      message.channel.send(`ERROR\n${err}`, { code: "xl" });
    }
  }
};
