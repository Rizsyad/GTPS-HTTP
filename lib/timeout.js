const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};

module.exports = haltOnTimedout;
