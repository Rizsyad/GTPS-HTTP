const Stress = require("ddos-stress");

// Create new instance of DDoS Stress
const stress = new Stress();

// Run stress on server
stress.run("http://127.0.0.1:80", 1000);
