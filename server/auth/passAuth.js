const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const secrets = require('../secrets')




let options = {
    usernameField: 'email'
}

//   =================Google stuff above =================To be dleted if it does'nt work 
passport.use(
    new GoogleStrategy(
      {
        REACT_APP_CLIENT_ID,
        REACT_APP_CLIENT_SECRET,
        REACT_APP_CALLBACK_URL, // Update with your callback URL
      },
      async (accessToken, refreshToken, profile, done) => {
        // Check if the user already exists in your database
        const user = await db.users.findOne({ where: { googleId: profile.id } });
  
        if (user) {
          // User exists, proceed with authentication
          return done(null, user);
        } else {
          // User doesn't exist, create a new user in your database
          const newUser = await db.users.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            // Add any other relevant user data from the profile object
          });
  
          return done(null, newUser);
        }
      }
    )
  )




//   =================Google stuff above =================
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
// passport.use(googleStrategy);











