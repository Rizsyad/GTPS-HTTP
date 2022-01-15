const { RateLimiterMemory } = require("rate-limiter-flexible");
const { getIp } = require("./helper");

const opts = {
  points: 5, // 5 points
  duration: 10, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = (req, res, next) => {
  let ip = getIp(req);

  rateLimiter
    .consume(ip, 5)
    .then(() => next())
    .catch(() => {
      res.destroy().end();
    });
};

module.exports = rateLimiterMiddleware;
