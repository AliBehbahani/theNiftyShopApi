const LocalStrat = require("passport-local").Strategy;

const { User } = require("../db/models");

const bcrypt = require("bcrypt");

exports.localStrat = new LocalStrat(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username },
    });
    let passMatch;
    if (user) {
      passMatch = await bcrypt.compare(password, user.password);
    }

    if (passMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});
