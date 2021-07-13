const LocalStrat = require("passport-local").Strategy;
const JWTStrat = require("passport-jwt").Strategy;

const { User } = require("../db/models");

const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

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
exports.jwtStrat = new JWTStrat(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
