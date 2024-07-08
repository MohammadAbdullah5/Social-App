const User = require('../models/userModel');
const jwt = require('jsonwebtoken'); // add this module npm i jsonwebtoken
const { expressjwt } = require('express-jwt'); // add this module npm i express-jwt
const { config } = require('./../config/config');

const signin = async (req, res) => {
    try {
    let user = await User.findOne({ "email": req.body.email })
    if (!user)
    return res.status(401).json({ error: "User not found" })
    if (!user.authenticate(req.body.password)) {
    return res.status(401).send({ error: "Email and password don't match." })
    }
    const token = jwt.sign({ _id: user._id }, config.jwtSecret)
    res.cookie('t', token, { expire: new Date() + 9999 }) // Set the cookie with the token and expiry date current date + 9999
    return res.json({
    token,
    user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture
    }
    })
    } catch (err) {
    return res.status(401).json({ error: "Could not sign in" })
    }
   
}

const signout = async (req, res) => {
    res.clearCookie("t");
    return res.status(200).json({
        message: "signed out"
    })
       
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256', 'RS256'] 
   }) // This function will populate the auth property of user using jwt

const hasAuthorization = (req, res, next) => { 
    const authorized = req.profile && req.headers.authorization // If request profile and auth exists
    && req.profile._id == req.auth._id // And if both are equal then go next
    if (!(authorized)) { // else throw error
    return res.status(403).json({
    error: "User is not authorized"
    })
    }
    next();
}   

module.exports = { signin, signout, requireSignin, hasAuthorization };