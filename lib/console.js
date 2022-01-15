const consola = require("consola");
const chalk = require("chalk");

const mainColor = "#94DAFF",
  successColor = "#41f45e",
  errorColor = "#ba1e1e",
  warningColor = "#FFC900",
  textColor = "#086E7D";

const success = (text) => {
  return consola.success(chalk.hex(successColor).bold(text));
};

const info = (text) => {
  return consola.info(chalk.hex(mainColor).bold(text));
};

const block = (text) => {
  return consola.info(chalk.hex(errorColor).bold(text));
};

const warning = (text) => {
  return consola.info(chalk.hex(warningColor).bold(text));
};

const text = (text) => {
  return chalk.hex(textColor).bold(text);
};

module.exports = {
  success,
  info,
  block,
  warning,
  text,
};
