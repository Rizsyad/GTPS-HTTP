const moment = require("moment-mini");
const { success, info, block, warning } = require("./console");

const getIp = (req) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  ip = ip.split(":").reverse()[0];
  return ip;
};

const sendLog = (req, res, isWarning = false) => {
  let ip = getIp(req);

  const statusCode =
    req.url === "/growtopia/server_data.php" && req.method === "POST"
      ? res.statusCode
      : "-";

  const userAgent =
    req.headers["user-agent"] === undefined ? "" : req.headers["user-agent"];

  const now = new Date();
  const dateStringWithTime = moment(now).format("YYYY-MM-DD HH:mm:ss");
  const message = `${ip} - - [${dateStringWithTime}] "${req.method} ${req.url}" ${statusCode} "${userAgent}"`;

  if (isWarning) {
    warning(`${message} \n`);
  } else {
    info(message);
  }
};

module.exports = {
  sendLog,
  getIp,
};
