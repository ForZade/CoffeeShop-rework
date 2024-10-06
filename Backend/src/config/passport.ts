import passport from "passport";
import { Request } from "express";
import { Strategy as JwtStrategy } from "passport-jwt";
import User, { UserInterface } from "../models/userModel";

const cookieExtractor = function (req: Request) {
  let token: string = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user: UserInterface = await User.findOne({ id: jwt_payload.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err: unknown) {
      console.log(err);
      return done(err, false);
    }
  }),
);

export default passport;
