import express, { Request } from "express";
import v1 from './api/v1';
import passport from 'passport'
import {ExtractJwt, Strategy as JwtStrategy, VerifiedCallback} from 'passport-jwt'
import { models } from "./db";

const app = express();
const cors = require('cors')

async function verifyFunction(req: Request, payload: any, done: VerifiedCallback){
  console.log(payload)
  try{
    const resp:any = await models.User.findOne({where: { id: payload.userID}})
    const user = resp.dataValues
    if(user && user.name===payload.name)
      done(null, user)
    else
      throw new Error('Unauthorised')
  }catch (e){
    console.log(e.message)
    done(e.message, null)
  }
}

passport.use('jwt-api', new JwtStrategy({
  audience: 'jwt-api',
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
  passReqToCallback: true,
  secretOrKey: process.env.SECRET_KEY
}, (req: Request, payload: any, done: VerifiedCallback) => verifyFunction(req, payload, done)))

passport.use('jwt-admin', new JwtStrategy({
  audience: 'jwt-admin',
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
  passReqToCallback: true,
  secretOrKey: process.env.SECRET_KEY
}, async (req: Request, payload: any, done: VerifiedCallback) => {
  console.log(payload)
  try{
    const resp:any = await models.User.findOne({where: { id: payload.userID}})
    const user = resp.dataValues
    if(user && user.name===payload.name)
      done(null, user)
    else
      throw new Error("Unauthorised");

  }catch (e){
    console.log(e.message)
    done(e.message, null)
  }
}))

passport.serializeUser((user, done) => done(null, user))
passport.serializeUser((user, done) => done(null, user))

app.use(express.urlencoded({extended: true}));
app.use(express.json());




app.use(passport.initialize())

app.use(cors())
app.use('/api', v1());

export default app;