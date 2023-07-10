const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple');
const secrets = require('../secrets')
const bcrypt = require('bcryptjs');
const db = require('../models');
const passport = require('passport');
require('../auth/passAuth');

router.use(express.urlencoded({extended: false}))
router.use(express.json())

//gatekeeper:
let requireLogin = passport.authenticate('local', {session: false})
let requireJwt = passport.authenticate('jwt', {session: false})

router.get('/', (req, res) => {
    res.send('arb analytics server')
})

const token = (userRecord) => {
    let timestamp = new Date().getTime();

    return jwt.encode({sub: userRecord.id, iat: timestamp}, secrets.secrets)
}

// registration api endpoint
router.post('/registration', async (req, res) => {
    try{
        let {email, password} = req.body;
        const record = await db.users.findOne({where: {email} });
        if(record){
            return res.status(409).json({error: 'user already exists'});
        }

        password = bcrypt.hashSync(password, 8);

        const newUser = await db.users.create({email, password});

        const jwtToken = token(newUser);

        res.json({token: jwtToken})
    }
    catch(err){
        return res.status(432).json({error: 'cannot access database'})
    }
})

// login api endpoint
router.post('/login', requireLogin, async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await db.users.findOne({where: { email }});
        if (!user){
            return res.status(404).json('user not found')
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid){
            return res.status(401).json('password not valid')
        }

        const jwtToken = token(user)
        return res.json({token: jwtToken})
    }
    catch (error){
        console.log(error);
        return res.status(500).json('something went wrong')
    }
});

router.get('/protected', requireJwt, (req, res) => {
    console.log('request', req.user.id)
    res.json({isValid: true, id: req.user.id})
})

// ================================google route end point 

router.get('/auth/google/signup', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/signin', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Redirect or respond with the necessary data after successful authentication
  res.redirect('/'); // Redirect to the home page after successful authentication
});

// Example protected route that requires Google authentication
router.get('/protected/google', passport.authenticate('google', { session: false }), (req, res) => {
  // Handle the protected route logic
  res.json({ message: 'Protected route with Google authentication' });
});

module.exports = router;