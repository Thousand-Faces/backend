import { User } from "../data/user.schema";
import passport from "passport";
require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

console.log(process.env.JWT_SECRET);
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload: any, done: any) => {
    User.findById(jwt_payload._id)
      .then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch((err) => console.log(err));
  })
);