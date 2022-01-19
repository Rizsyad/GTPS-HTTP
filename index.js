const express = require("express");
const helmet = require("helmet");
const robots = require("express-robots-txt");
const bodyParser = require("body-parser");
const prompt = require("prompt-sync")({ sigint: true });
const setTitle = require("console-title");
const timeout = require("connect-timeout");
const { success, text } = require("./lib/console");
const { sendLog } = require("./lib/helper");
const rateLimiterMiddleware = require("./lib/rate-limiter");
const haltOnTimedout = require("./lib/timeout");

const app = express();

setTitle("GTPS HTTP | DDOS Protection!");

// input handle
console.clear();
const nameGTServer = prompt(text("Name GTPS Server: "));
const ipServer = prompt(text("Ip Server: "));
const portServer = prompt(text("Port UDP (17091): "), { value: "17091" });
console.clear();

console.log("GTPS HTTP (C) Rizsyad AR");
console.log("================================================");
console.log(text(`[+] IP Server: ${ipServer}`));
console.log(text(`[+] Port UDP: ${portServer}`));
console.log(text(`[!] Node-JS Anti-DDoS Started`));
console.log("================================================");

const PORT = process.env.PORT || 80;

const pack = `
server|${ipServer}
port|${portServer}
type|1
#maint|HTTP SERVER ${nameGTServer}

beta_server|127.0.0.1
beta_port|17091

beta_type|1
meta|localhost
RTENDMARKERBS1001
`;

// middleware for handle all http
app.use(timeout("5s"));
app.use(rateLimiterMiddleware);
app.use(helmet());
app.use(
  robots({
    UserAgent: "*",
    Disallow: "/",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(haltOnTimedout);

app.post("/growtopia/server_data.php", (req, res) => {
  sendLog(req, res, false);
  res.status(200).send(pack).end();
});

// don't accept all method
app.use((req, res) => {
  sendLog(req, res, true);
  res.destroy().end();
});

app.listen(PORT, () => {
  success(`http is online: listen http://${ipServer}:${PORT} \n`);
});
