const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models')

const ExtractJwt = require('passport-jwt').ExtractJwt;

const secrets = require('../secrets')

let options = {
    usernameField: 'email'
}

let localStrategy = new LocalStrategy(options, async (email, password, done) => {
    try{
        let record = await db.users.findOne({ where: {email} })
        if(record){
            console.log('a record was found for this user');
            bcrypt.compare(password, record.password, (err, match)=>{
                if(err){
                    return done(err)
                }
                if(match){
                    console.log('passwords match');
                    return done(null, record);
                }
                else {
                    console.log('passwords did not match');
                    return done(null, false)
                }
            })
        }
        else {
            console.log('no record found for this user');
            return done(null, false)
        }

    } catch(err){
        console.log('error in try block');
        console.log(err);
        return done(err)
    }
})

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secrets.secrets
}

let jwtLogin = new JwtStrategy(jwtOptions, async (payload, done)=>{
    try{
        let userID = payload.sub;
        let user = await db.users.findByPk(userID);
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
})

passport.use(localStrategy)
passport.use(jwtLogin)