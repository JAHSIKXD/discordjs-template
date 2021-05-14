const { blueBright, redBright, yellowBright, greenBright } = require("chalk");
const moment = require("moment");
moment.locale('pl');

class Log {
  constructor() {
    this._refresh();
  }
  _refresh() {
	this.date = `${moment(new Date()).format("DD.MM.YYYY")} (${moment(
      new Date()
    ).format("HH:mm:ss")})`;
  }
  ready(content) {
	this._refresh();
    return console.log(
      greenBright(`[${this.date}] ${content}`)
    );
  }
  warn(content) {
	this._refresh();
    return console.log(
      yellowBright(`[${this.date}] ${content}`)
    );
  }
  error(content) {
	this._refresh();
    return console.log(
      redBright(`[${this.date}] ${content}`)
    );
  }
  log(content) {
	this._refresh();
    return console.log(
      blueBright(`[${this.date}] ${content}`)
    );
  }
}

global.log = new Log();
